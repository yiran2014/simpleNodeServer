//模拟form表单提交数据，到服务器端对应的path路径下，进行数据的处理

var http=require('http');
var server=http.createServer();
var qs=require('querystring');
const fs=require('fs');
server.listen(8809);
/* Schema://host:port/path?query#hash */
/*   协议://域名:端口/路径?查询参数#哈希*/
var users=[];
server.on('request',function(request,response){
	//response.setHeader('Content-Type','text/javascript;charset=utf-8');
	var url=request.url;//url为path?query，即路径+查询参数
	console.log('url...'+url);
	var query=url.substr(url.indexOf('?')+1);//只取到查询参数query
	console.log('query...'+query);
	var queryKey=qs.parse(query);//将查询参数(a=1&b=2&c=hello)解析成一个(对象)键值对的集合{a:'1',b:'2',c:'hello'}
	
	var path=url.substr(0,url.indexOf('?'));
	console.log('path...'+path);
	var responseStr;
	console.log(request.method);
	switch(path){
		case '/user':
			switch(request.method){
				case 'GET':
					responseStr=JSON.stringify(users);
					response.end(responseStr);
					break;
				case 'POST':
					//var headers=request.headers;
						//console.log(headers);
					var contentType=request.headers['content-type'];
						console.log(contentType);
					
					var count=0;
					var responseStrBody='';
					request.on('data',function(data){
						responseStrBody += data.toString();
						console.log(responseStrBody);
					});
					request.on('end',function(){
						user=qs.parse(responseStrBody);//这里的responseStrBody值为a=1&b=2格式，非json格式的字符串，所以用qs.parse()解析
						users.push(user);
						response.end(JSON.stringify(user));
					});
					
					break;
				default:
					response.statusCode = 404;
					responseStr='NOT FOUND METHOD';
			}
		 	break;

		case '/test.html':
			fs.createReadStream('./test.html').pipe(response);
			break;
		default:
			response.statusCode = 404;
			responseStr='NOT FOUND USER PATH';

	}
});