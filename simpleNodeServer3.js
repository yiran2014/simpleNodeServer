//用于演示get和post请求的区别
//get用于获取内容，post用于新建、上传内容

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
					break;
				case 'POST':
					var user={age:Math.floor(Math.random()*100)};
					users.push(user);//把对象赋值到数组内
					responseStr=JSON.stringify(user);
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
	response.end(responseStr);
});