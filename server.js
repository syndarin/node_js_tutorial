var http = require("http");
var url = require("url");

function start(route, handle){
	
	function onRequest(request, response){

		var pathname = url.parse(request.url).pathname;
		var postData = "";

		console.log("request for "+pathname);
		
		request.setEncoding("utf8");

		request.addListener("data", function(postDataChunk){
			postData += postDataChunk;
			console.log("postDataChunk received - " + postDataChunk);
		});

		request.addListener("end", function(){
			route(handle, pathname, response, postData);	
		});
		
	}

	var server = http.createServer(onRequest);
	server.listen(8888);

	console.log("server has started...");		
}

exports.start = start;


