require.config({
	paths:{
		"jquery":"vendor/jquery/jquery",
		"underscore":"vendor/underscore-amd/underscore",
		"backbone":"vendor/backbone-amd/backbone",
		"text":"vendor/requirejs-text/text"
	},
	urlArgs: "v=" +  (new Date()).getTime()
});

require(['views/messages','views/addMessage','collections/messages', ],function(MsgsView,AddMsg,MsgCollection){

	msgCollec = new MsgCollection();
	v = new MsgsView({collection:msgCollec});

	a = new AddMsg();
});

require(['views/users','collections/users'],function(UsersView,UsrCollec){
	usrCollec = new UsrCollec();
	usersView = new UsersView({collection:usrCollec});

});


setInterval(function(){
		msgCollec.fetch({update: true, remove: false});
},2000);
setInterval(function(){
		usrCollec.fetch({refresh:true});
		console.log('users fetched');
},30000);



require(['jquery'],function($){

	setInterval(function(){
		$.get( "/chat/api/users/update/", function( data ) {
		console.log("updated");
	});
	},30000);
	
});