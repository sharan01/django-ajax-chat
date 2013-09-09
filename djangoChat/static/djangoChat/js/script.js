var div = $('.chatBox');
var auto_scroll = function(){
	var pos = div.scrollTop();
    div.scrollTop(pos+=1000);

};
//////////////////////////////////////////////////////////////
//chat 

window.App = {
		Models : {},
		Collections : {},
		Views : {},
		Helpers : {},
		Router : {}
	};




	App.Helpers.template = function(selector){
		return _.template($(selector).html());
	};


	App.Models.Msg = Backbone.Model.extend({
		defaults:{
			user:'you',
			time:"Today " + new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
		}
	});
	App.Collections.Msgs = Backbone.Collection.extend({
		model : App.Models.Msg,
		url : '/chat/api/',
		initialize : function(){
			//this.fetch();
		}
	});

	App.Views.Msg = Backbone.View.extend({
		tagName : 'tr',
		className : 'chatMsg',
		template : App.Helpers.template(".messageView"),

		render : function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
	
	App.Views.Msgs = Backbone.View.extend({
		tagName : 'table',
		className : 'chatMsgs',
		initialize : function(){
			this.collection.fetch();
			$('.chatBox').html(this.el);
			this.collection.on("add", this.every, this);
			this.collection.on("reset", this.updated, this);
		},
		render : function(){
			this.collection.each(this.addOne,this);
			return this;
		},
		addOne : function(msg){
			console.log('addone');
			console.log(msg.toJSON());
			var newMsg = new App.Views.Msg({model:msg});
			this.$el.append(newMsg.render().el);
		},
		every : function(msg){
			var newMsg = new App.Views.Msg({model:msg});
			this.$el.append(newMsg.render().el);
		},
		updated : function(){
			console.log("refresh event");
			$(this.el).empty();
			this.collection.each(this.every,this);
		}
	});

	msgCollec = new App.Collections.Msgs();

	chatView = new App.Views.Msgs({collection:msgCollec});




	App.Views.AddMsg = Backbone.View.extend({
		el:'#chatForm',
		events:{
			'submit' : 'submit'
		},

		submit : function(e){
			e.preventDefault();
			
			nwmsg = $(e.currentTarget).find('textarea').val();
			$(e.currentTarget).find('textarea').val('');
			
			
			if($.trim(nwmsg)){ // check wether submmites msg is empty
				msgCollec.create({msg:nwmsg});
			}
			auto_scroll();

		}
	});

	addView = new App.Views.AddMsg();

	// retrive loop
	setInterval(function(){
		msgCollec.fetch({reset:true});
	},5000);

	// scroll lopp

setInterval(auto_scroll, 5000);
