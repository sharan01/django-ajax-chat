define(['backbone','jquery'],function(Backbone,$){
	Message = Backbone.Model.extend({
		
		validate: function(attr){
			// temporary m so as to not modify attr.msg when jquery trim is called 
			m = attr.msg;
			if($.trim(m) === ''){
				return "empty messege";
			}
		},
		initialize: function(){
			this.on('invalid',function(model,error){
				console.log(error);
			});
		}
	});

	return Message;
});

	