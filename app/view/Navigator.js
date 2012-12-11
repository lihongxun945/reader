/* iframe有bug，无法滚动，暂时没有好的解决方法 */
Ext.define("Reader.view.Navigator", {
    extend: "Ext.Panel",
    xtype: "navigator",
    id: "navigator",
    config: {
        title: "浏览器",
        layout: "fit",
        tpl: '<iframe id="navigator" style="border: 0; width: 100%; height: 100%;" src="{url}"> </iframe>'
        //tpl: "<iframe src={url}></iframe>"

    }
});
