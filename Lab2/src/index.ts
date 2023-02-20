import { Scraper } from "./scraper/scraper.js";
import { FileFeedItemWriter } from "./shared/writers/file-feed-item-writer.js";
import { Server } from './server/server.js'
import { FileFeedItemReader } from "./shared/readers/file-feed-item-reader.js";


const writer = new FileFeedItemWriter();
const scraper = new Scraper(writer);
scraper.run();
const fileReader = new FileFeedItemReader();
const server = new Server(fileReader)
server.run();
