define(['backbone','underscore','text!templates/user.tmpl'],function(Backbone,_,usrTmpl){
	return Backbone.View.extend({
		tagName : 'div',
		className : 's_user',
		template : _.template(usrTmpl),

		render : function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
});