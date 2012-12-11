Ext.define("Reader.store.ListStore", {
	id: "liststore",
	extend: "Ext.data.Store",
	config: {
		model: "Reader.model.ListItem",
		autoLoad: true,
		proxy: {
			type: "ajax",
			url: "/reader/json/1",
		},
		listeners: {
			//竟然找不到一个parse之类的函数可以在使用数据之前先解析下，
			//先通过监听refresh来实现parse
			refresh: function(a, b) {
				if (this.refreshed) {
					this.refreshed = false; //小心此处，不然会无限refresh
					return;
				}
				//pullrefresh插件不太好用
				if (this.rmAllOnRefresh) {
					this.rmAllOnRefresh = false;
					this.refreshed = true;
					this._writeData(b);
					return;
				}
				this.refreshed = true;
				this._writeData(b);
			},
			load: function() {
				if (!this.pageIndex) this.pageIndex = 2;
				else this.pageIndex++;
				this.getProxy().setUrl("/reader/json/" + this.pageIndex);
			},
			pullrefresh: function() {
				this.getProxy().setUrl("/reader/json/1");
				this.pageIndex = 1;
				this.rmAllOnRefresh = true;
				this.loadPage(1);
			}
		},

		writeData: function(b) {
			var a = this;
			var data = a._markRead(a._parseData(b));
			var topicliststore = Ext.getStore("TopicListStore");
			var userliststore = Ext.getStore("UserListStore");

			a.setData(data);
			topicliststore.setData(a._groupByTopic(data));
			userliststore.setData(a._groupByUser(data));
		},

		//将取到的数组转换成对象，方便使用
		parseData: function(d) {
			var result = [];
			var datas = d.items;
			for (var i = 0; i < datas.length; i++) {
				var data = datas[i].raw;
				if (data.raw) { //在以前已经被parse过的
					result.push(data);
					continue;
				}
				var a = {};
				a.id = data[0];
				a.bio = data[1];
				a.content = data[2];
				a.voteUpCount = data[3];
				a.createdTime = data[4];
				a.urlToken = data[5];
				a.author = {};
				a.question = {};
				if (data[6] != 0) {
					a.author.avatarURL = data[6][2];
					a.author.name = data[6][0];
					a.author.bio = data[1];
                    if(a.author.bio.length > 30) {
                        a.author.bio = a.author.bio.substr(0,30) + "..."; //个人简介截短
                    }
					a.author.urlToken = data[6][1];
					a.author.id = data[6][3];
				} else {
					a.author = data[6];
				}
				a.question.id = data[7][0];
				a.question.title = data[7][1];
				a.question.description = data[7][2];
				a.question.urlToken = data[7][3];
				a.question.followerCount = data[7][4];
				a.question.answerCount = data[7][5];
				a.question.readCount = data[7][6];
				a.question.topics = [];
				for (var k = 0; k < data[7][7].length; k++) {
					a.question.topics[k] = {};
					a.question.topics[k].id = data[7][7][k][0];
					a.question.topics[k].name = data[7][7][k][1];
					a.question.topics[k].introduction = data[7][7][k][2];
					a.question.topics[k].avatarURL = data[7][7][k][3];
					a.question.topics[k].urlToken = data[7][7][k][4];
				}
				a.currentQuestion = a.question;
				a.voteUsers = [];
				for (var k = 0; k < data[8].length; k++) {
					if (data[8][k] != 0) {
						a.voteUsers[k] = {};
						a.voteUsers[k].name = data[8][k][0];
						a.voteUsers[k].urlToken = data[8][k][1];
						a.voteUsers[k].avatarURL = data[8][k][2];
						a.voteUsers[k].id = data[8][k][2];
					} else {
						a.voteUsers.push(0);
					}
				}

				result.push({
					raw: a
				});
			}
			return result;

		},
        //标记已读和未读条目
		markRead : function(datas) {
            var readed = localStorage.getItem("readed") || [];
            Ext.Array.forEach(datas, function(d) {
                for(var i=0, len = readed.length; i < len; i++) {
                    if(readed[i] == d.raw.id) d.raw.readed = true;
                    break;
                }
            });
            
            return datas;
        },
		groupByTopic: function(datas) {
			var result = [];
			//计算数量，按数量排序
			var index = {};
			var data, topics;
			for (var i = 0, len = datas.length; i < len; i++) {
				data = datas[i];
				topics = data.raw.question.topics;
				for (var j = 0, len2 = topics.length; j < len2; j++) {
					this._count_(index, topics[j].name);
				}
			}

			var name;
			for (var i = 0, len1 = datas.length; i < len1; i++) {
				data = datas[i];
				var topics = data.raw.question.topics;
				for (var j = 0, len2 = topics.length; j < len2; j++) {
					name = topics[j].name;
					result.push({
						grouper: name,
						sorter: this._length_(index[name]) + name,
						// +name ? to fix bug of sorter
						index: index[name],
						raw: data.raw
					});
				}
			};
			return this._getTop_(result, 10);
		},
		groupByUser: function(datas) {
			var result = [];

			//计算数量，按数量排序
			var index = {};
			for (var i = 0, len = datas.length; i < len; i++) {
				this._count_(index, datas[i].raw.author.name);
			}

			var data, name;
			for (var i = 0, len = datas.length; i < len; i++) {
				data = datas[i];
				name = data.raw.author.name
				result.push({
					grouper: name,
					sorter: this._length_(index[name]) + name,
					index: index[name],
					raw: data.raw
				});
			}
			return this._getTop_(result, 10);
		},
		count_: function(obj, name) {
			if (obj[name] >= 1) obj[name] = obj[name] + 1;
			else obj[name] = 1;
		},
		getTop_: function(arr, count) {
			count = count || 10;

			//console.log("before", arr.length, arr);
			arr = Ext.Array.sort(arr, function(a, b) {
				if (a.index == b.index) return a.grouper > b.grouper ? - 1: 0;
				return b.index - a.index;
			})
			var groupers = [];
			var result = [];
			var item;
			//console.log("sorted", arr.length, arr);
			for (var i = 0, len = arr.length; i < len; i++) {
				item = arr[i];
				if (!Ext.Array.contains(groupers, item.grouper)) {
					if (groupers.length > count + 1) break;
					groupers.push(item.grouper);
				}
				result.push(item);
			}
			//console.log("after", result.length, result);
			return result;
		},
		length_: function(num) {
			num = num + "";
			while (num.length < 2) {
				num = "0" + num;
			}
			return num;
		}

	}

});

