Ext.define("Reader.view.ShareDialog", {
    id:"sharedialog",
    extend: "Ext.ActionSheet",
    xtype: "sharedialog",
    config: {
        items:[
            {
            text: '分享到新浪微博',
            ui  : 'confirm',
            scope: this,
            handler: function(){
                Ext.getCmp("sharedialog").fireEvent("share2sina");
            }
            },
            {
            text: '分享到腾讯微博',
            ui  : 'confirm',
            scope: this,
            handler: function(){
                Ext.getCmp("sharedialog").fireEvent("share2qq");
            }
            },
            {
            text: '邮件分享',
            ui : 'confirm',
            scope: this,
            handler: function(){
                Ext.getCmp("sharedialog").fireEvent("share2email");
            }
            },
            {
            text: 'Cancel',
            ui: "decline",
            scope: this,
            handler: function(){
                Ext.getCmp("sharedialog").fireEvent("cancel");
            }
            }
        ]
    }
});
