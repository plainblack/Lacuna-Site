getServers = function() {
	var loadUrl = "http://www.lacunaexpanse.com/servers.json",	// what file to load
		data,						// where to store the returned data
		servers = [					// predefined list for fallback
		 {
		  "name" : "US1",
		  "uri" : "https://us1.lacunaexpanse.com/",
		  "status" : "Open",
		  "location" : "United States",
		  "type" : "Empire Server",
		  "description" : "Long term empire building, with focus on exploration, trade, and malevolent AI. Server never expires."
		 }
	];

	$.ajaxSetup({
		cache: false
	});

	// Download loadUrl and store it in servers, call createServerList either way
	$.ajax({
		url: loadUrl,
		dataType: 'json',
		data: data,
		success: function(data) {
			servers = data;
			createServerList(servers);
		},
		error: function() {
			createServerList(servers);
		}
	});
}

createServerList = function(servers) {
        var server_list = "";
	for( var srv = 0; srv < servers.length; srv++ ) {
		var server = servers[srv];
	        server_list = server_list + '<div class="server_listing">';
			server_list = server_list + '<div class="server_name"><a href="' + server.uri + '" target="_top">' + server.name + '</a></div>';
			server_list = server_list + '<div class="server_description">' + server.description + '</div>';
			server_list = server_list + '<div class="server_details"><b>Type:</b> ' + server.type + '</div>';
			server_list = server_list + '<div class="server_details"><b>Status:</b> ' + server.status + '</div>';
			server_list = server_list + '<div class="server_details"><b>Location:</b> ' + server.location + '</div>';
		server_list = server_list + '</div>';
              
	}
        document.getElementById('server_list').innerHTML = server_list;
};

window.onload = getServers;


