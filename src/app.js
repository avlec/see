const http = require('http'),
			filesystem = require('fs'),
			path = require('path');

const port = 3000;

const url_map = {
    'default' : "404.html",
    'home': "home.html",
};

const server = http.createServer((request, response) => {
    console.log(request);

    // Get request URL
    var request_url = request.url;
    var request_url 

    var request_type = request.method;



    var response_code = 200;

    switch(request_type) {
            case default:
            request_url = "/404";
            repsonse_code = 404;
            case "GET":
            break;
            case "HEAD":

            break;
            case "POST":

            break;
            case "PUT":

            break;
            case "DELETE":
            break;
            case "CONNECT";
            break;
            case "OPTIONS";
            break;
            case "TRACE";
    }

    var filePath = path.join(__dirname, 'workspace.html');
    var stat = filesystem.statSync(filePath);


    response.writeHead(200, {
        'Content-Type' : 'text/html',
        'Content-Length' : stat.size
    });

    var readStream = filesystem.createReadStream(filePath);
    readStream.pipe(response);
});

server.listen(port, () => {
  console.log(`Server running at http://www.hardsoftware.net:${port}/`);
});
