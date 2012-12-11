Ext.define("Reader.view.Main", {
    extend: 'Ext.Panel',
    id: "main",
    xtype: "main",
    requires: [
        'Ext.TitleBar',
        'Ext.data.JsonP'
    ],
    config: {
        fullscreen: true,
        layout: "card",
        items: [
            {
                xtype: "homepanel"
            },
            {
                xtype: "topiclist"
            },
            {
                xtype:"userlist"
            }
        ]
    }
});
