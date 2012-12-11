Ext.define("Reader.view.App",{
        extend: "Ext.navigation.View",
        xtype: "app",
        id: "app",
        requires: [
            "Ext.SegmentedButton"
        ],
        config: {
            autoDestroy: false,
            fullscreen: 'true',
            navigationBar:{
                ui: "light",
                items:[
                    {
                        text: "知乎阅读",
                        id: "mainAboutBtn",
                        ui: "plain",
                        cls: "title",
                        hideAnimation: "fadeOut",
                        showAnimation: "fadeIn"
                    },
                    {
                        xtype: "segmentedbutton",
                        id: "maintab",
                        allowDepress: false,
                        hideAnimation: "fadeOut",
                        showAnimation: "fadeIn",
                        items: [
                            {
                                text: "全部",
                                id: "alltab",
                                pressed: true
                            },
                            {
                                text: "话题",
                                id: "topictab"
                            },
                            {
                                text: "用户",
                                id: "usertab"
                            }
                        ]
                    },

                ]
            },
            items: [
               {xtype:"main"}
            ]
        }
    });
