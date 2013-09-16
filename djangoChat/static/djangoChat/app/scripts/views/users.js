define(['backbone','views/user'],function(Backbone,usrView){

	return Backbone.View.extend({

		el : '.onlineUsers',
		initialize : function(){

			this.collection.fetch();
			//this.collection.on("add", this.addOne, this);
			this.collection.on('add',this.render,this);
			this.collection.on('remove',this.render,this);
		},
		render : function(){
			console.log('........................................rendering............');
			this.$el.html('');
			this.collection.each(this.addOne,this);
			return this;
		},
		addOne : function(usr){
			var newUsr = new usrView({model:usr});
			this.$el.append(newUsr.render().el);
		}
	});
});