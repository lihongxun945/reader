Ext.define("Reader.view.UserList", {
    id: "userlist",
    extend: "Ext.List",
    xtype: "userlist",
    config: {
        itemTpl: "<div class=\"list-item\"><div class=\"avatar-container\"><img src=\"<tpl if=\"raw.author.avatarURL\">{raw.author.avatarURL}<tpl else>http://p4.zhimg.com/66/6b/666b0abfc_s.jpg</tpl>\" /></div><div class=\"detail-container\"><span class=\"vote g-r4px\">{raw.voteUpCount} </span><h3>{raw.question.title}</h3><strong><tpl if=\"raw.author.name\">{raw.author.name} · <tpl else>匿名用户</tpl></strong><span class=\"bio\">{raw.author.bio}</span></div></div>",
        store: "UserListStore",
        grouped: true,
        sorted: false
    }
});
