var http = require("http");
var sys = require("sys");
var formidable = require("formidable");

http.createServer(function(request, response){

	if(request.url == '/upload' && request.method.toLowerCase() == 'post'){
		var form = formidable.IncomingForm();
    	form.parse(request, function(err, fields, files) {
      		response.writeHead(200, {'content-type': 'text/plain'});
      		response.write('received upload:\n\n');
      		response.end(sys.inspect({fields: fields, files: files}));
    	});
    	return;
	}

	response.writeHead(200, {'content-type': 'text/html'});
  	response.end(
    	'<form action="/upload" enctype="multipart/form-data" '+
    	'method="post">'+
    	'<input type="text" name="title"><br>'+
    	'<input type="file" name="upload" multiple="multiple"><br>'+
    	'<input type="submit" value="Upload">'+
    	'</form>'
 	 );

}).listen(8888);