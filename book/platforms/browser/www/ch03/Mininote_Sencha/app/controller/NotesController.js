Ext.define("NotesApp.controller.NotesController", {

    extend: "Ext.app.Controller",
    config: {
    	//宣告變數以參考檢視物件 如“noteslistview”物件在control中可以用notesListView參考        
        refs: {         
            notesListView: "noteslistview",
            noteEditorView: "noteeditorview",
            notesList: "#notesList"
        },
        //宣告時間的處理函數以及作用範圍，如newNoteEvent事件的監聽函數為onNewNoteHandler，作用範圍
        //為notesListView
        control: {
            notesListView: {               
                newNoteEvent: "onNewNoteHandler",
                editNoteEvent: "onEditNoteHandler"
            },
            noteEditorView: {               
                saveNoteEvent: "onSaveNoteHandler",
                deleteNoteEvent: "onDeleteNoteHandler",
                backToHomeEvent: "onBackToHomeHandler"
            }

        }
    },
  
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

  
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    activateNoteEditor: function (record) {
		console.log("note editor view active");
        var noteEditorView = this.getNoteEditorView();
        noteEditorView.setRecord(record); 
        Ext.Viewport.animateActiveItem(noteEditorView, this.slideLeftTransition);
    },
    activateNotesList: function () {
    	console.log("note list view active");
        Ext.Viewport.animateActiveItem(this.getNotesListView(), this.slideRightTransition);
    },

    // 事件處理函數
    
    //點擊新增按鈕後的處理函數    
    onNewNoteHandler: function () {
        console.log("enter onNewNoteHandler");
		//建立Note Model案例
        var now = new Date();
        var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 1000)).toString();

        var newNote = Ext.create("NotesApp.model.Note", {
            id: noteId,
            dateCreated: now,
            content: ""
           
        });		
		//啟動編輯面板
        this.activateNoteEditor(newNote);

    },
    
    //點擊筆記清單中的某一條後的處理函數
    onEditNoteHandler: function (list, record) {  
        console.log("enter onEditNoteHandler");
        this.activateNoteEditor(record);
    },
    
    //點擊儲存按鈕後的處理函數
    onSaveNoteHandler: function () {
    	console.log("enter onSaveNoteHandler");
        //重設新的值
        var noteEditorView = this.getNoteEditorView();

        var currentNote = noteEditorView.getRecord();
        var newValues = noteEditorView.getValues();        
        currentNote.set("content", newValues.content);
      
        
       //驗證所填訊息是否有效
        var errors = currentNote.validate();
        if (!errors.isValid()) {
            Ext.Msg.alert('注意!', errors.getByField("content")[0].getMessage(), Ext.emptyFn);
            currentNote.reject();
            return;
        }
		//更新store
        var notesStore = Ext.getStore("NotesStore");
        if (null == notesStore.findRecord('id', currentNote.data.id)) {
            notesStore.add(currentNote);
        }
        notesStore.sync();
        notesStore.sort([{ property: 'dateCreated', direction: 'DESC'}]);
		//跳躍主頁面
        this.activateNotesList();
    },
    
    //點擊移除按鈕後的回調函數
    onDeleteNoteHandler: function () {      
		console.log("enter onDeleteNoteHandler");
        var noteEditorView = this.getNoteEditorView();
        var currentNote = noteEditorView.getRecord();
        var notesStore = Ext.getStore("NotesStore");
        notesStore.remove(currentNote);
        notesStore.sync();
        this.activateNotesList();
    },
    
    onBackToHomeHandler: function () {        
        this.activateNotesList();
    },

   
    launch: function () {
    	//自動載入store訊息
        this.callParent(arguments);
        var notesStore = Ext.getStore("NotesStore");
        notesStore.load();        
    },
    init: function () {
        this.callParent(arguments);       
    }
});