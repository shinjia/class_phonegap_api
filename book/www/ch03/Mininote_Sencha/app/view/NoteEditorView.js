Ext.define("NotesApp.view.NoteEditorView", {
    extend: "Ext.form.Panel",
    requires: "Ext.form.FieldSet",
    alias: "widget.noteeditorview",
    config: {
        scrollable: 'vertical',
         layout: {
            type: 'fit'
        },
        items: [
            {
                xtype: "toolbar",
                docked: "top",
                title: "編輯隨筆",
                items: [
                    {
                        xtype: "button",
                        ui: "back",
                        text: "主頁",
                        itemId: "backButton"
                    },
                    { xtype: "spacer" },
                    {
                        xtype: "button",
                        ui: "action",
                        text: "儲存",
                        itemId: "saveButton"
                    }
                ]
            },
            {
                xtype: "toolbar",
                docked: "bottom",
                items: [
                    {
                        xtype: "button",
                        iconCls: "trash",
                        centered: true,
                        iconMask: true,
                        itemId: "deleteButton"
                    }
                ]
            },
            { xtype: "fieldset",
                items: [
                    {
                        xtype: 'textareafield',
                        name: 'content',                        
                        placeHolder: '請輸入...',                        
                        required: true
                    }
                ]
            }
        ],
        listeners: [
            {
                delegate: "#backButton",
                event: "tap",
                fn: "onBackButtonHandler"
            },
            {
                delegate: "#saveButton",
                event: "tap",
                fn: "onSaveButtonHandler"
            },
            {
                delegate: "#deleteButton",
                event: "tap",
                fn: "onDeleteButtonHandler"
            }
        ]
    },
    onSaveButtonHandler: function () {        
        this.fireEvent("saveNoteEvent", this);
    },
    onDeleteButtonHandler: function () {        
        this.fireEvent("deleteNoteEvent", this);
    },
    onBackButtonHandler: function () {       
        this.fireEvent("backToHomeEvent", this);
    }

});

