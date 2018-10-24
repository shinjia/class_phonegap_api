Ext.define("NotesApp.store.NotesStore", {
    extend: "Ext.data.Store",    
    data : data,
    config: {
        model: "NotesApp.model.Note",
        proxy: {
        	type: 'memory',
        	reader: {
           		type: 'json',
            	root: 'notes'
        	}
    	},
        sorters: [{ property: 'dateCreated', direction: 'DESC'}],
        grouper: {
            sortProperty: "dateCreated",
            direction: "DESC",
            groupFn: function (record) {

                if (record && record.data.dateCreated) {
                	var recordDate= record.data.dateCreated;
                	var fullYear = recordDate.getFullYear();
                	var month = recordDate.getMonth()+1;
                	var day = recordDate.getDate();
                	return fullYear+"-"+month+"-"+day;                   
                } else {
                    return '';
                }
            }
        }
    }
});


var data = {
    notes: [

    ]
};

