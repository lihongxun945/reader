Ext.define('Reader.controller.AnswerPanelControl', {
    extend: 'Ext.app.Controller',
    requires: [
        "Reader.view.OpenLinkSheet",
        "Reader.view.OpenImageSheet"
    ],
    config: {
        refs: {
            app: "#app"
        },
    },
    launch: function(){
        var that = this;
        window.ZH = {};
        ZH.showOriginImg = function(){};    //这是主站上用的
        Ext.getCmp("answerpanel").on("linkClick", this.showLinkSheet, this);
        Ext.getCmp("answerpanel").on("imageClick", this.showImageSheet, this);
        this.openLinkActions = Ext.create("Reader.view.OpenLinkSheet");
        this.openLinkActions.hide();
        Ext.Viewport.add(this.openLinkActions);
        this.openLinkActions.on("openlink", function(e){
            this.openLink(this.link);
            this.openLinkActions.hide();
        }, this);
        this.openLinkActions.on("cancel", function(e){
            this.openLinkActions.hide();
        }, this);

        this.openImageAction = Ext.create("Reader.view.OpenImageSheet");
        this.openImageAction.hide();
        Ext.Viewport.add(this.openImageAction);
        this.openImageAction.on("openimage", function(e){
            this.openImage(this.imageSrc);
            this.openImageAction.hide();
        }, this);
        this.openImageAction.on("cancel", function(e){
            this.openImageAction.hide();
        }, this);
    },
    openImage: function(url){
        //打开原始大图可能会闪退，所以只是放大图片而已
        var app = Ext.getCmp("app");
        if(!this.imagepanel) {
            this.imagepanel = Ext.create("Reader.view.ImagePanel");
        }
        this.imagepanel.setData({"src" : url});//
        app.push(this.imagepanel);
    },
    showLinkSheet: function(e){
        this.link = e.href;
        this.openLinkActions.show();
    },
    showImageSheet: function(image){
        this.imageSrc = image.src;
        this.openImageAction.show();
    },
    openLink: function(link){
        window.open(link);
        //iframe打开无法滚动，暂时注释吧
        /*if(!this.navigator) {
            this.navigator = Ext.create("Reader.view.Navigator");
        }
        this.navigator.setConfig({title: link});
        this.navigator.setData({url: link});
        var app = this.getApp();
        app.push(this.navigator);*/
    }
});
