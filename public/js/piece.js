Piece = function(root) {
	this.root = $(root);

	this.activate();
}

Piece.create = function(parent) {
	var root = $('<div class="piece" />');
	var header = $('<div class="header" />').appendTo(root);
	header.append('<a href="#remove">X</a>');
	root.append('<div><textarea/></div>');
	root.append('<div class="footer" />')
	var result = new Piece(root.appendTo(parent));

	result.setText("(テキストを入力して下さい)");

	return result;
}

Piece.prototype = {
	getText: function() {
		return $(this.root).find('textarea').text();
	},
	setText: function(text) {
		$(this.root).find('textarea').text(text);
	},

	rename: function() {
		//var text = window.prompt("タイトルを入力してください", "");
		//this.setText(text);
	},

	// TODO: 「親」のメソッドにしたい
	remove: function() {
		this.root.remove();
	},

	activate: function() {
		var self = this;
		this.root.draggable({
			start: function(event, target) {
				console.log("start");
				console.log(target);
			},
			stop: function(event, target) {
				console.log("stop");
				console.log("(" + target.position.top + "," + target.position.left + ")");
			},
			//drag: function(event, target) {
			//	console.log("drag");
			//	console.log(target);
			//}
		});
		this.root.find('a[href=#remove]').bind('click', function() {
			self.remove();
			return false;
		});
	}
}

$(function() {
	$('#toolbar a[href=#create]').click(function() {
		var draggable = Piece.create("#board");
		return false;
	});
});
