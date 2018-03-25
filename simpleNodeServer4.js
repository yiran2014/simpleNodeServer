//对于post请求，体验请求类型Content-Type的使用

var http=require('http');
var server=http.createServer();
var qs=require('querystring');
server.listen(8809);
/* Schema://host:port/path?query#hash */
/*   协议://域名:端口/路径?查询参数#哈希*/
var users=[];
server.on('request',function(request,response){
	response.setHeader('Content-Type','text/javascript;charset=utf-8');
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
					if(contentType !== 'application/json'){
						response.statusCode=404;
						response.end('error');
					}else{
					var responseStrBody='';//不赋值会报错，不理解什么原因
					//console.log(0)
					request.on('data',function(data){
						responseStrBody += data.toString();
						console.log(responseStrBody);
					});
					request.on('end',function(){
						user=responseStrBody;
						users.push(JSON.parse(responseStrBody));
						responseStr=user;//不知道为啥postman显示不出值，经过打日志console.log0、1、2、3、4发现，
										//这里为异步执行，所以先执行了3、4，值为空，再执行到这里，
										//而response.end()不会执行两遍
						//console.log(1)
						//response.end(responseStr);
						//console.log(2)
						response.end(responseStr);
					});
					}
					break;
				default:
					response.statusCode = 404;
					responseStr='NOT FOUND METHOD';
			}
		 	break;
		default:
			response.statusCode = 404;
			responseStr='NOT FOUND USER PATH';

	}
	// console.log(3)
	// response.end(responseStr);
	// console.log(4)
});