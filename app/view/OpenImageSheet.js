Ext.define("Reader.view.OpenImageSheet", {
    id:"openimagesheet",
    extend: "Ext.ActionSheet",
    xtype: "openimagesheet",
    config: {
        items:[
            {
                text: '查看图片',
                ui  : 'confirm',
                scope: this,
                handler: function(){
                    Ext.getCmp("openimagesheet").fireEvent("openimage");
                }
            },
            {
                text: '取消',
                ui: "decline",
                scope: this,
                handler: function(){
                    Ext.getCmp("openimagesheet").fireEvent("cancel");
                }
            }
        ]
    }
});
