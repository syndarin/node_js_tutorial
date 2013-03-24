var querystring = require("querystring");
var fs = require("fs"); 

var responseHead = {"Content-type":"text/plain"};
var responseHeadHtml = {"Content-type":"text/html"};

function start(response, postData){
	console.log("request handler start invoked");

	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text1" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

	show200(response, responseHeadHtml, body);

}

function upload(response, postData){
	console.log("request handler upload invoked");
	show200(response, responseHead, "You've sent - " + querystring.parse(postData).text1);
}

function show(response, postData){
    console.log("request handler for 'show' was called");
    fs.readFile("/tmp/test.png", "binary", function(error, file){
        if(error){
            response.writeHead(500, {"Content-type":"text/plain"});
            response.write(error+"\n");
            response.end();
        }else{
            response.writeHead(200, {"Content-type":"image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

function show200(response, head, content){
	response.writeHead(200, head);
	response.write(content);
	response.end();
}

exports.start = start;
exports.upload = upload;
exports.show = show;