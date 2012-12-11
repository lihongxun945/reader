Ext.define("Reader.view.AnswerList", {
    id: "answerlist",
    extend: "Ext.List",
    xtype: "answerlist",
    requires: [
        'Ext.plugin.PullRefresh',
        'Ext.plugin.ListPaging'
    ],
    config: {
        itemTpl: "<div class=\"list-item <tpl if=\'raw.readed\'><tpl else>unread</tpl>\"><div class=\"avatar-container\"><img src=\"<tpl if=\"raw.author.avatarURL\">{raw.author.avatarURL}<tpl else>http://p4.zhimg.com/66/6b/666b0abfc_s.jpg</tpl>\" /><div class=\"unread-icon\"></div></div><div class=\"detail-container\"><span class=\"vote g-r4px\">{raw.voteUpCount} </span><h3>{raw.question.title}</h3><strong><tpl if=\"raw.author.name\">{raw.author.name} · <tpl else>匿名用户</tpl></strong><span class=\"bio\">{raw.author.bio}</span></div></div>",
        //loading mask
        /*masked: {
            xtype: 'loadmask',
            message: '加载中...'
        },*/
        store: "ListStore",
        plugins: [
            { 
                xclass: 'Ext.plugin.PullRefresh',
                pullRefreshText: '下拉刷新',
                releaseRefreshText: '释放刷新',
                loadingText: "正在加载...",
                refreshFn: function(plugin) {
                    var store = plugin.up().getStore();
                    store.fireEvent('pullrefresh');

                    //修复原生pullrefresh插件bug
                    //原生的插件在loading文字消失后开始loading数据，不合常理，改了一下PullRefresh的代码，并且现在在refreshFn中需要手动复位滚动条
                    store.on({
                        single: true,
                        load: function(){
                            var list = Ext.getCmp("answerlist");
                            scroller = list.getScrollable().getScroller(),
                            scroller.minPosition.y = 0;
                            scroller.scrollTo(null, 0, true);
                        }
                    });
                }
            },
            { 
                xclass: 'Ext.plugin.ListPaging',
                loadTpl: "<div class=\"loading-wrap\"><img src=\"/static/reader/resources/images/spinner2.gif\" /><a href=\"javascript:;\">加载更多...</a></div>"
            }
        ]
    }

});
