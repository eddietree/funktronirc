var g_funk_irc;



function FunkIrc( a_server, a_username ) 
{
	var irc = require('irc');

	this.server = a_server;
	this.username = a_username;

	this.client = new irc.Client(this.server, this.username, 
	{
	    channels: ['#funktronic'],
	});

	this.client.addListener('registered', function (message) 
	{
		$('#login-form').toggle('slow', function() {
		   $('#main-page').toggle( true );
		  });

		Log( "Logged onto: " + message.prefix );
	});

	this.client.addListener('join', function (channel, nick, message) 
	{
	    Log("Joined channel " + channel);

	    // create new tab
	    var tab = new Tab(GetChannelId(channel), channel);
    	tab.addToBoard();
	});

	this.client.addListener('message', function (nick, to, text, message) 
	{
		var channel = to;
		var channel_id = GetChannelId(channel);
		var tab = g_tabs[channel_id];
	    
	    tab.appendMsg(nick + ": " + text);
	    //tab.makeActive();
	});

	this.client.addListener('error', function (message) 
	{
	    alert(message.command);
	    Log("[ERROR]: " + message.command);
	});

	this.client.addListener('raw', function (message) 
	{
		//Log(message.command);
	    //alert(message.command);
	});
}

function handle_login()
{
	$('#login').button();

	$('#login').on('click', function (e) 
	{ 
		e.preventDefault();
		$('#login').button('loading');

		var username = $('#irc-username').val();
		var server = $('#irc-server').val();

		g_funk_irc = FunkIrc( server,  username );
	});
}

$(function() {
    handle_login();

    //$('#main-page').toggle(false);
    $( "#tabs" ).tab();

    // add console tab
    g_console_tab = new Tab("console", "Console");
    g_console_tab.addToBoard();
    g_console_tab.makeActive();

    //var test_test = new Tab("test_id", "title");
   // test_test.addToBoard();
  });

