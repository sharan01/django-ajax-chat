define(['backbone','models/message'],function(Backbone,MsgModel){

	Messages = Backbone.Collection.extend({
			model : MsgModel,
			url : '/chat/api/'
	});

	return Messages;

});
