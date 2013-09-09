var g_tabs = {};
var g_console_tab;

function Log(a_msg)
{
	g_console_tab.appendMsg(a_msg);
}

// raw channel name is something like "#funktronic"
function GetChannelId( a_raw_channel_name )
{
	// TODO: handle special characters etc
	// basically need to convert to a symbol that has 
	// no spaces and no special characters
	return a_raw_channel_name.substring(1);
}


function Tab( a_id, a_title )
{
	this.id = a_id; // only string
	this.title = a_title;
	this.dom_tab = null;
	this.dom_content = null;

	this.addToBoard = function()
	{
		this.dom_tab = $('<li><a href="#' + this.id + '" data-toggle="tab">' + this.title + ' <span class="badge">42</span></a></li>');
		$("#tabs").append( this.dom_tab );

		this.dom_content = ('<div class="tab-pane fade" id="' + this.id + '"><ul class="tab-msgs"></ul></div>');
		$("#tabs-content").append( this.dom_content );

		g_tabs[a_id] = this;
	}

	this.onMakeActive = function()
	{
		// TODO: erase any box
	}

	this.appendMsg = function( a_msg )
	{
		//var list = this.dom_content.find("ul");
		var list = $("#"+this.id).find("ul").first();
		list.append("<li>" + a_msg + "</li>");
	};

	this.makeActive = function()
	{
		$('#tabs a[href="#'+this.id+'"]').tab('show');
	}

	this.removeFromBoard = function()
	{
		this.dom_tab.remove();
		this.dom_content.remove();
	}
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