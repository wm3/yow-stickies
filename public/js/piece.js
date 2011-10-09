Piece = function(root) {
	this.root = $(root);

	this.activate();
}

Piece.create = function(parent) {
	var result = new Piece($('<div class="piece"><p/></div>').appendTo(parent));

	result.rename();

	return result;
}

Piece.prototype = {
	getText: function() {
		return $(this.root).find('p').text();
	},
	setText: function(text) {
		$(this.root).find('p').text(text);
	},

	rename: function() {
		var text = window.prompt("タイトルを入力してください", "");
		this.setText(text);
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
				console.log(target);
			},
			//drag: function(event, target) {
			//	console.log("drag");
			//	console.log(target);
			//}
		});
		this.root.click(function() {
			self.rename();
		});
	}
}

$(function() {
	$('#toolbar a[href=#create]').click(function() {
		var draggable = Piece.create("#board");
		return false;
	});
});
