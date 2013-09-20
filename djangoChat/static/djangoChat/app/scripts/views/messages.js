define(['backbone','views/message','channel'],function(Backbone,MsgView,Channel){

	return Backbone.View.extend({

		tagName : 'div',
		className : 'chatMsgs',
		initialize : function(){
			$('.chatBox').html(this.el);
			this.collection.on("add", this.addOne, this);
			Channel.on('addMsg',this.addMsg,this);
			this.render();
			//scroll to bottom after render
			$("html, body").animate({ scrollTop: $(document).height() }, 1000);
		},
		render : function(){
			this.collection.each(this.addone,this);
			return this;
		},
		addOne : function(msg){
			var newMsg = new MsgView({model:msg});
			this.$el.append(newMsg.render().el);
			//autoscroll
			if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {

				$('html, body').animate({scrollTop:$(document).height()}, 500);
			}
			
		},
		addone : function(msg){
			// for inital rnder without scroll animation
			var newMsg = new MsgView({model:msg});
			this.$el.append(newMsg.render().el);
		},
		addMsg : function(m){
			this.collection.create({msg:m},{wait:true});
		}
	});

});