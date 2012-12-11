Ext.define("Reader.store.UserListStore", {
        id: "userlisttore",
        extend: "Ext.data.Store",
        config: {
            model: "Reader.model.ListItem",
            grouper: {
                groupFn: function(a){
                    return a.raw.grouper || "匿名用户";
                },
                sortProperty: "sorter",
                direction: "DESC"
            }
        }

    });
