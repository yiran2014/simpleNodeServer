var http=require('http');
var server=http.createServer();
var qs=require('querystring');
server.listen(8809);
/* Schema://host:port/path?query#hash */
/*   协议://域名:端口/路径?查询参数#哈希*/
var flag=0;
server.on('request',function(request,response){
	response.setHeader('Content-Type','text/javascript;charset=utf-8');
	var url=request.url;//url为path?query，即路径+查询参数
	console.log('url...'+url);
	var query=url.substr(url.indexOf('?')+1);//只取到查询参数query
	console.log('query...'+query);
	var queryKey=qs.parse(query);//将查询参数(a=1&b=2&c=hello)解析成一个(对象)键值对的集合{a:'1',b:'2',c:'hello'}
	console.log(typeof(queryKey));
	console.log('queryKey...'+JSON.stringify(queryKey));
	var responseStr;
	if (url.indexOf('/hello')>-1) {
		if(queryKey.i_need_money ==='true' && Number(queryKey.how_much) >= 500){
			responseStr='滚开';
		}else{
			responseStr='ok,没问题';
		}		
	}else if (url.indexOf('/world')>-1) {
		responseStr='我是world';
	}else{
		responseStr='我理解不了你的路径';
	}
	response.end(responseStr);
});