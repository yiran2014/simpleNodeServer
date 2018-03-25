//为何请求体如此复杂?对于用表单上传大文件到内存中时，会炸掉会溢出
//此时的处理方式为流式编程（用流和buffer处理，一口吃不下就一口一口吃）
//对于大文件，先把一部分数据读到内存中，再写到文件中，然后释放内存

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
					
					var count=0;
					request.on('data',function(data){
						//
						count++;
						console.log(data);
					});
					request.on('end',function(){
						//
						console.log(count);
						response.end(count+'');
					});
					
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