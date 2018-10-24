function onDeviceReady(){
	
	
	 console.log("device ready2");
	Ext.application({
    name: "NotesApp",
    models: ["Note"],
    stores: ["NotesStore"],
    controllers: ["NotesController"],
    views: ["NotesListView", "NoteEditorView"],
    launch: function () {

        var notesListView = {
            xtype: "noteslistview"
        };
        var noteEditorView = {
            xtype: "noteeditorview"
        };
         Ext.Viewport.add([notesListView, noteEditorView]);

       

    }
});
	

}


