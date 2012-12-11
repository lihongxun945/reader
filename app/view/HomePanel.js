Ext.define("Reader.view.HomePanel", {
    extend: "Ext.Panel",
    xtype: "homepanel",
    config: {
        layout: "fit",
        items:[
        {
            xtype: "panel",
            layout: "fit",
            items: [
                {
                    xtype:"answerlist"
                }
            ]
        }
        ]
    }
});
