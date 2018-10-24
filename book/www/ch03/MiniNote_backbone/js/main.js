var NoteApp = Backbone.Router.extend({

	routes: {
		"": "list",
		"list": "list",
		"notes/new": "newNote",
		"notes/add": "addNote",
		"notes/:id": "showNote"
	},
	
	initialize: function () {
		// 將所有CSS型態為.back的DOM元素加入瀏覽器的頁面傳回動作
		$('.back').live('click', function(event) {
			window.history.back();
			return false;
		});
		this.firstPage = true;
		this.noteList = new NoteList();
		// 範例資料
		this.noteList.add(new Note({id: 1, content: "到了機場記得列印行程單"}));
		this.noteList.add(new Note({id: 2, content: "本周末要還原健身"}));
		this.noteList.add(new Note({id: 3, content: "不要忘記帶傘"}));
	},
	// 套用的首頁面，展示筆記清單
	list: function() {
		this.changePage(new NoteListPage({model: this.noteList}));
	},
	// 新增筆記頁面
	newNote: function() {
		this.changePage(new NewNoteView({model: new Note()}));
	},
	// 加入筆記動作
	addNote: function() {
		var newNote = new Note({id: this.noteList.length + 1, content: $("#newNoteContent").val()});
		this.noteList.add(newNote);
		this.navigate("", {trigger: true});
	},
	// 顯示筆記頁面
	showNote: function(id) {
		var note = this.noteList.get(id);
		this.changePage(new NoteView({model: note}));
	},
	// 頁面切換
	changePage: function (page) {
		$(page.el).attr('data-role', 'page'); // 修飾為jQuery Mobile中的page
		page.render();
		$('body').append($(page.el));
		var transition = $.mobile.defaultPageTransition;
		if (this.firstPage) { // 首個頁面不需要頁面切換效果
			transition = 'none';
			this.firstPage = false;
		}
		// 切換並著色頁面
		$.mobile.changePage($(page.el), {changeHash: false, transition: transition});
	},
	// 啟動套用，進行頁面的路由
	start: function() {
		Backbone.history.start();
	}
	
});

$(document).ready(function() {
	// 加載套用所需的檢視範本
	tpl.loadTemplates(["note-details", "note-list-item", "notes-page", "new-note"], function() {
		// 檢視範本加載完畢，建立MiniNote套用案例並啟動它
		app = new NoteApp();
		app.start();
	});
});