Ext.define('Reader.controller.ShareAnswerControl', {
        extend: 'Ext.app.Controller',
        config: {
            routes: {
            },
            refs: {
                app: "#app",
                shareAnswerBtn: "#answerShareBtn",
            },
            control: {
                shareAnswerBtn: {
                    tap: "shareAnswer" 
                }
            }
        },
        launch: function(){
            this.navigator = Ext.create("Reader.view.Navigator");
            //Ext.getCmp("answerpanel").on("linkClick", this.linkClick, this);
        },
        linkClick: function(a){
            this.openUrl(a.href);
        },
        shareAnswer: function(){
            if(!this.actions) this.actions = Ext.Viewport.add(Ext.create("Reader.view.ShareDialog"));
            this.actions.show();
            this.actions.on("share2sina", this.share2sina, this)
            this.actions.on("share2qq", this.share2qq, this)
            this.actions.on("share2email", this.share2email, this)
            this.actions.on("cancel", function(){this.actions.hide();}, this)
        },
        share2qq: function(){
         
        },
        share2sina: function(){
        
        },
        share2email: function(url, opt_title){
            this.actions.hide();
        },
        openUrl: function(url, opt_title){
            
        }
});
