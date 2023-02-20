import http from 'http'
import { FileFeedItemReader } from '../shared/readers/file-feed-item-reader.js';
import { PORT } from "./server-config.js";

export class Server {
    private fileReader: FileFeedItemReader;
    private server: http.Server;

    constructor(fileReader: FileFeedItemReader) {
        this.fileReader = fileReader;
        this.server = http.createServer(function (req, res) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            const files = fileReader.enumerateIds();
            res.write(`<h1>List of files:</h1>`);
            for(const el of files){
                res.write(`<h3><a href=http://localhost:8080/${el}>${el}</a></h3>`);
            }
            res.end();
        })
    }
    run(): void {
        this.server.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`);
        });
    }
}
