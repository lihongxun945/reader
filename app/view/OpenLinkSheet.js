Ext.define("Reader.view.OpenLinkSheet", {
    id:"openlinksheet",
    extend: "Ext.ActionSheet",
    xtype: "openlinksheet",
    config: {
        items:[
            {
                text: '打开链接',
                ui  : 'confirm',
                scope: this,
                handler: function(){
                    Ext.getCmp("openlinksheet").fireEvent("openlink");
                }
            },
            {
                text: 'Cancel',
                ui: "decline",
                scope: this,
                handler: function(){
                    Ext.getCmp("openlinksheet").fireEvent("cancel");
                }
            }
        ]
    }
});
