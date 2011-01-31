function showServers(e) {
	// show the server list
	var serverList = document.getElementById('listContainer');
	serverList.style.display = "block";

	// set up the onclick handlers
	var sitenav = document.getElementById('sitenav');
	var play = sitenav.childNodes[0].childNodes[1];
	play.onclick = hideServers;
	var playnow = document.getElementById('playnow');
	playnow.onclick = hideServers;
}

function hideServers(e) {
	// hide the server list
	var serverList = document.getElementById('listContainer');
	serverList.style.display = "none";

	// set up the onclick handlers
	var sitenav = document.getElementById('sitenav');
	var play = sitenav.childNodes[0].childNodes[1];
	play.onclick = showServers;
	var playnow = document.getElementById('playnow');
	playnow.onclick = showServers;
}

getServers = function() {
	var loadUrl = "servers.json",	// what file to load
		data,						// where to store the returned data
		servers = [					// predefined list for fallback
		 {
		  "name" : "US1",
		  "uri" : "https://us1.lacunaexpanse.com/",
		  "status" : "Open",
		  "location" : "United States",
		  "type" : "Empire Server",
		  "description" : "Long term empire building, with focus on exploration, trade, and malevolent AI. Server never expires."
		 },
		 {
		  "name" : "PT",
		  "uri" : "https://pt.lacunaexpanse.com/",
		  "status" : "Open",
		  "location" : "United States",
		  "type" : "Public Test Server",
		  "description" : "All testing, all the time. Long term empire building, with focus on exploration, trade, and malevolent AI. Server never expires."
		 },
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
	var body = document.getElementById('body'),
		div = document.createElement('div'),
		ul = document.createElement('ul'),
		li = document.createElement('li'),
		a = document.createElement('a');
	var nDiv = div.cloneNode(false),
		nUl = ul.cloneNode(false);
	nDiv.id = 'listContainer';
	nDiv.style.display = "none";
	nUl.id = 'serverList';
		
	for( var srv = 0; srv < servers.length; srv++ ) {
		var server = servers[srv];
		if( server.status == 'Open' ) {
			var nLi = li.cloneNode(false),
				nA = a.cloneNode(false),
				nT = document.createTextNode(server.name);
			if( srv == 0 ) {
				nLi.id = 'top';	
			}
			else if( srv == servers.length ) {
				nLi.id = 'bottom';
			}
			nA.appendChild(nT);
			nA.setAttribute('href', '#');
			nLi.appendChild(nA);

				var cUl = ul.cloneNode(false),
					cLi = li.cloneNode(false),
					cA = a.cloneNode(false),
					cT = nT.cloneNode(false);
				cA.appendChild(cT);
				cA.setAttribute('href', server.uri);
				cLi.appendChild(cA);
				cUl.appendChild(cLi);
				cLi = li.cloneNode(false);
				cLi.innerHTML = server.type + ' / ' + server.location + '<hr />' + server.description;
				cUl.appendChild(cLi);

			nLi.appendChild(cUl);
			nUl.appendChild(nLi);
		}
	}
	nDiv.appendChild(nUl);
	body.appendChild(nDiv);


	// Add onclick event to the play button
	var sitenav = document.getElementById('sitenav');
	var play = sitenav.childNodes[0].childNodes[1];
	play.onclick = showServers;
	if( play.captureEvents ) play.captureEvents(Event.CLICK);

	// Add onclick event to the playnow button
	var playnow = document.getElementById('playnow');
	playnow.onclick = showServers;
	if( playnow.captureEvents ) playnow.captureEvents(Event.CLICK);
};

/* From  "Drop-Down Menus, Horizontal Style" by Nick Rigby
 *  * http://www.alistapart.com/articles/horizdropdowns/ */
startList = function() {
	if (document.all&&document.getElementById) {
		navRoot = document.getElementById("nav");
		for (i=0; i<navRoot.childNodes.length; i++) {
			node = navRoot.childNodes[i];
			if (node.nodeName=="LI") {
				node.onmouseover=function() {
					this.className+=" over";
				}
				node.onmouseout=function() {
					this.className=this.className.replace(" over", "");
				}
			}
		}
	}
};

window.onload = startList;
window.onload = getServers;


