Ext.define('Reader.controller.Control', {
	extend: 'Ext.app.Controller',
	config: {
		routes: {},
		refs: {
			app: "#app",
			main: "#main",
			answerlist: "#answerlist",
			topiclist: "#topiclist",
			userlist: "#userlist",
			answerShareBtn: "#answerShareBtn",
			mainAboutBtn: "#mainAboutBtn",
            mainTab: "#maintab",
            allTab: "#alltab",
            topicTab: "#topictab",
            userTab: "#usertab"
		},
		control: {
			app: {
                pop: "onAppPop",
				activeitemchange: "onAppItemChange"
			},
			/*main: {
				activeitemchange: "mainitemchange"
			},*/
			answerlist: {
				itemtap: "showAnswer"
			},
			userlist: {
				itemtap: "showAnswer"
			},
			topiclist: {
				itemtap: "showAnswer"
			},

			mainAboutBtn: {
				tap: "showAbout"
			},
            allTab: {
                tap: "tabAll"
            },
            topicTab: {
                tap: "tabTopic"
            },
            userTab: {
                tap: "tabUser"
            }
		}
	},
	launch: function() {
		this.getMain().getLayout().setAnimation(false);
		//先初始化，因为其他地方初始化时会用到
		this.answerPanel = Ext.create("Reader.view.AnswerPanel");
	},

	onAppPop: function(view, item) {
		if (item.id == "aboutreader") {
			this.getApp().getLayout().setAnimation({
				type: "slide"
			}); //把动画改回默认的slide
		}
	},
	//集中处理页面切换
	onAppItemChange: function(view, item) {
		if (item.id == "answerpanel" || item.id == "aboutreader") {
            this.getMainTab().hide();
			this.getMainAboutBtn().hide();
		} else if (item.id == "main") {
			this.getMainTab().show();
			this.getMainAboutBtn().show();
		}
	},
	showAnswer: function(a, b, c, d) {
        this.answerPanel.setConfig({title: d.raw.raw.question.title});
        this.answerPanel.setData(d.raw);
        this.answerPanel.getScrollable().getScroller().scrollToTop();
		this.getApp().push(this.answerPanel);

        //标记已读
        var readed = (localStorage.getItem("readed") || "") .split(",");
        readed = [d.raw.id].concat(readed);
        localStorage.setItem("reader", readed);
        this.answerPanel.removeCls("unread");
	},
    tabAll: function(e){
        this.getMain().setActiveItem(0);
    },
    tabTopic: function(e){
        this.getMain().setActiveItem(1);
    },
    tabUser: function(e){
        this.getMain().setActiveItem(2);
    },
    showAbout: function(e) {
		var app = this.getApp();
		app.getLayout().setAnimation({
			type: "cover",
            direction: "up"
		});
		if (!this.about) this.about = Ext.create("Reader.view.About");
		app.push(this.about);
	}

});

