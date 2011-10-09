Piece = function(root) {
	this.root = $(root);

	this.activate();
}

Piece.create = function(parent, id) {
	var root = $('<div class="piece" />');
	var header = $('<div class="header" />').appendTo(root);
	header.append('<a href="#remove">X</a>');
	root.append('<div><textarea/></div>');
	root.append('<div class="footer" />')
	var idContainer = $('<input type="hidden" name="id" value=""/>').appendTo(root);
	if (id) idContainer.val(id);
	var result = new Piece(root.appendTo(parent));

	result.setText('');

	return result;
}
Piece.saveAll = function(board) {
	Piece.list(board).each(function(i, view) {
		var id = this.getId();
		var data = {
			text: this.getText(),
			x: this.getPosition().x,
			y: this.getPosition().y
		};

		var method = (id != '') ? 'PUT' : 'POST';
		var url = (id != '') ? 'piece/' + id : 'piece';

		console.log('update: ' + id);
		console.log(data);

		$.ajax(url, {
			type: method,
			data: data,
			dataType: 'json',
			success: function(data, textStatus, xhr) {
				console.log(data);
				if ( ! id) {
					var newId = data.id;
					console.log('new: ' + newId);
					view.setId(newId);
				}
			}
		});
	});
}
Piece.list = function(board) {
	return $(board).find('.piece').map(function() {
		return new Piece(this);
	});
}

Piece.loadAll = function(board) {
	$.getJSON('pieces', function(pieces) {
		for (var i = 0; i < pieces.length; i++) {
			var data = pieces[i];
			var view = Piece.create($(board), data.id);
			view.setText(data.text);
			view.setPosition({x: data.x, y: data.y});
		}
	});
}

Piece.prototype = {
	getId: function() {
		return this.root.find('input[name=id]').val();
	},
	setId: function(id) {
		return this.root.find('input[name=id]').val(id);
	},
	getText: function() {
		return this.root.find('textarea').val();
	},
	setText: function(text) {
		if ( ! text) text = "(テキストを入力して下さい)";
		this.root.find('textarea').val(text);
	},
	getPosition: function() {
		var x = parseInt(this.root.css('left'));
		var y = parseInt(this.root.css('top'));
		// TODO: 例外処理として、これで良い?
		if ( ! x || !y) throw new Exception('failed to get position: ' + x + ", " + y);
		return { x: x, y: y };
	},
	setPosition: function(position) {
		// TODO: 範囲チェック
		this.root.css('left', position.x);
		this.root.css('top', position.y);
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
	Piece.loadAll($('#board'));
	$('#toolbar a[href=#create]').click(function() {
		var draggable = Piece.create("#board");
		return false;
	});
	$('#toolbar a[href=#saveall]').click(function() {
		Piece.saveAll("#board");
		return false;
	});
});
