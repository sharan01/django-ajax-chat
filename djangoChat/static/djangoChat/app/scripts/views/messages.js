define(['backbone','views/message','channel'],function(Backbone,MsgView,Channel){

	Messages = Backbone.View.extend({

		tagName : 'div',
		className : 'chatMsgs',
		initialize : function(){

			this.collection.fetch();
			$('.chatBox').html(this.el);
			this.collection.on("add", this.addOne, this);
			Channel.on('addMsg',this.addMsg,this);
		},
		addOne : function(msg){
			var newMsg = new MsgView({model:msg});
			this.$el.append(newMsg.render().el);
			//  ugly  find the right way to scroll
			$("html, body").animate({ scrollTop: $(document).height() }, 300);
		},
		addMsg : function(m){
			this.collection.create({msg:m},{wait:true});
		}
	});

	return Messages;

});