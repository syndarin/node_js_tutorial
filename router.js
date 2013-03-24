function route(handle, pathname, response, postData){
	console.log("route request for "+pathname);

	if(typeof handle[pathname] === 'function' ){
		handle[pathname](response, postData);
	}else{
		console.log("no request handler found for path - " + pathname);
		show404(response);
	}
}

function show404(response){
	response.writeHead(404, {"Content-Type":"text/plain"});
	response.write("404 - Not found");
	response.end();
}

exports.route = route;