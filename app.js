Ext.application({
    name: 'Reader',

    requires: [
        'Ext.MessageBox'
    ],

    views: ["App", 'Main', "AnswerList","HomePanel", "TopicList", "UserList", "About", "AnswerPanel", "ImagePanel", "Navigator", "ShareDialog"],
    models: ["ListItem"],
    stores: ["ListStore", "TopicListStore", "UserListStore"],
    controllers: ["Control", "AnswerPanelControl", "ShareAnswerControl"],

    /*icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },*/

    isIconPrecomposed: true,

    startupImage: {
        '320x460': '/static/reader/resources/startup/reader-320x460.png', //for iphone no retina, and all other device
        '640x920': '/static/reader/resources/startup/reader-640x920.png', //for iphone retina
        '768x1004': '/static/reader/resources/startup/reader-768x1004.png', //for ipad portrait
        '748x1024': '/static/reader/resources/startup/reader-748x1024.png', //for ipad landscape
        /*'1536x2008': 'resources/startup/reader.png', //for ipad retina portrait
        '1496x2048': 'resources/startup/reader.png' // for ipad retina landscape*/
    },

    icon: "/static/reader/resources/icons/reader.png",
    viewport: { //总是全屏显示
        autoMaximize: true
    },
    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('Reader.view.App'));
    },

    onUpdated: function() {
    }
});
