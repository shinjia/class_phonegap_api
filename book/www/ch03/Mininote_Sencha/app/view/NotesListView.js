Ext.define("NotesApp.view.NotesListView", {
    extend: "Ext.Container",
    requires:"Ext.dataview.List",
    alias: "widget.noteslistview",  

    config: {
        layout: {
            type: 'fit'
        },
        items: [{
            xtype: "toolbar",
            title: "我的隨筆",
            docked: "top"

        }, {
            xtype: "list",
            store: "NotesStore",
            itemId:"notesList",
            loadingText: "載入中，請稍後",
            emptyText: "沒有隨筆",
            onItemDisclosure: true,
            grouped: true,
            itemTpl: "{content}"       
        },
         {
                xtype: "toolbar",
                docked: "bottom",
                centered:true,
                items: [
                    {
                        xtype: "button",
                        iconCls: "add",
                        ui: 'action',
                        centered: true,
                        iconMask: true,
                        itemId: "newButton"
                    }
                ]
            }        
        
        ],
        listeners: [{
            delegate: "#newButton",
            event: "tap",
            fn: "onNewButtonHandler"
        }, {
            delegate: "#notesList",
            event: "disclose",
            fn: "onNotesListDiscloseHandler"
        }]
    },    
    onNewButtonHandler: function () {       
        this.fireEvent("newNoteEvent", this);
    },
    onNotesListDiscloseHandler: function (list, record, target, index, evt, options) {        
        this.fireEvent('editNoteEvent', this, record);
    }
});