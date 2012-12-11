Ext.define("Reader.view.ImagePanel", {
    extend: "Ext.Panel",
    xtype: "imagepanel",
    config: {
        layout: "fit",
        fullscreen: true,
        title: "查看图片",
        scrollable: true,
		listeners: {
			painted: function(panel) {
				//只执行一次绑定
				if (this.addListeners_) {
					return
				};
				this.addListeners_ = true;
				var el = panel.element;
				/*el.on("doubletap", function() {
                    $(".image-wrap").toggleClass("big");;
				});*/
			}
		},
        tpl:"<div class=\"image-wrap\"><tpl if=\"src\"><img src=\"{src}\" /><tpl else><tpl for=\".\"><img src=\"{src}\" /></tpl></tpl><div>"
    }
});
