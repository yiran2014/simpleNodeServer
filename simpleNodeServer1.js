var http=require('http');
var server=http.createServer();
server.listen(8809);

var count=0;
server.on('request',function(request,response){
	response.setHeader('Content-Type','text/javascript;charset=utf-8');
	console.log(count++);
	var url=request.url;
	console.log(url);
	var responseStr;
	if (url==='/hello') {
		responseStr='我是hello';
		console.log(responseStr);
	}else if (url==='/world') {
		responseStr='我是world';
		console.log(responseStr);
	}else{
		responseStr='我理解不了你的路径';
		console.log(responseStr);
	}
	response.end(responseStr);
});