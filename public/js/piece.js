$(function() {
	var draggable = $( "#draggable" );
	draggable.draggable({
		start: function(event, target) {
			console.log("start");
			console.log(target);
		},
		stop: function(event, target) {
			console.log("stop");
			console.log(target);
		},
		drag: function(event, target) {
			console.log("drag");
			console.log(target);
		}
	});
});
