Ext.define("Reader.store.TopicListStore", {
        id: "topicliststore",
        extend: "Ext.data.Store",
        config: {
            model: "Reader.model.ListItem",
            grouper: {
                groupFn: function(a){
                    return a.raw.grouper;
                },
                sortProperty: "sorter",
                direction: "DESC"
            }
        }

    });
