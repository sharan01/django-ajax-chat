define(['backbone','underscore','text!templates/message.tmpl'],function(Backbone,_,MessageTmpl){

	return Backbone.View.extend({
		tagName : 'div',
		className : 'monologue',
		template : _.template(MessageTmpl),

		render : function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
});