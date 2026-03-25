const index = fs.readFileSync(`${__dirname}/../home.html`);

const respond = (request, response, content, type) => {
    // set status code (200 success) and content type
    response.writeHead(200, {
        'Content-Type': type,
        'Content-Length': Buffer.byteLength(content, 'utf8'),
    });
    // write the content string or buffer to response
    response.write(content);
    // send the response to the client
    response.end();
};

const getIndex = (request, response) => respond(request, response, index, 'text/html');

module.exports.getIndex = getIndex;