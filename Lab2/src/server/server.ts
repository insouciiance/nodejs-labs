import http from 'http'
import url from 'url'
import { FileFeedItemReader } from '../shared/readers/file-feed-item-reader.js';
import { PORT } from "./server-config.js";

export class Server {
    private fileReader: FileFeedItemReader;
    private server: http.Server;

    constructor(fileReader: FileFeedItemReader) {
        this.fileReader = fileReader;
        this.server = http.createServer(function (req, res) {
            if (req.url === '/news') {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                const files = fileReader.enumerateIds();
                res.write(`<h1>List of files:</h1>`);
                for (const el of files) {
                    res.write(`<h3><a href=http://localhost:8080/news/${el}>${el}</a></h3>`);
                }
                return res.end();
            }
            if (req.url.startsWith('/news/')) {
                const q = url.parse(req.url, true);
                const path = q.pathname.split('/')
                try {
                    const data = JSON.stringify(fileReader.read(path.pop()));
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.write(data);
                    return res.end();
                } catch (err) {
                    console.error(err);
                    res.statusCode = 500; 
                    res.setHeader('Content-Type', 'text/plain');
                    return res.end('An error occurred while opening the directory');
                }
            }
            res.statusCode = 404;
            res.end('Not found');
        })
    }
    run(): void {
        this.server.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`);
        });
    }
}
