define(['backbone','models/user'],function(Backbone,usrModel){
	return Backbone.Collection.extend({
		url:'/chat/api/users/',
		model:usrModel
	});
});