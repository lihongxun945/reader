Ext.define("Reader.view.AnswerPanel", {
	extend: "Ext.Panel",
	xtype: "answerpanel",
	id: "answerpanel",
	config: {
        title: "答案",
		scrollable: true,
		layout: "fit",
		listeners: {
			painted: function(panel) {
				//只执行一次绑定
				if (this.addListeners_) {
                    return
                };
                this.addListeners_ = true;
                var el = panel.element;
                el.on('tap', function(e, t) {
                    var image = e.getTarget('img');
                    if (image) {
                        this.fireEvent("imageClick", image);
                        return
                    }
                }, panel);
                el.on('tap', function(e, t) {
                    var link = e.getTarget('a');
                    if (link) {
                        this.fireEvent("linkClick", link);
                        e.preventDefault();
                        return
                    }
                }, panel);
			}
		},
		tpl: "<div class=\"answer\"><div class=\"answer-title-container\"><h2>{raw.question.title}</h2><span>{raw.question.description}</span></div>" + "<div class=\"answer-author-container\"><div class=\"answer-author-img\"><img src=\"<tpl if=\"raw.author.avatarURL\">{raw.author.avatarURL}<tpl else>http://p4.zhimg.com/66/6b/666b0abfc_s.jpg</tpl>\" /></div><div class=\"answer-author-detail\"><h2><tpl if=\"raw.author.name\">{raw.author.name}<tpl else>匿名用户</tpl></h2><span><tpl if=\"raw.author.bio\">{raw.author.bio}<tpl else>&nbsp;</tpl></span></div></div>" + "<div class=\"answer-content-container\">{raw.content}</div></div>"
	}

});

