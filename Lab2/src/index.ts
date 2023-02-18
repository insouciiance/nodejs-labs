import { Scraper } from "./scraper/scraper.js";
import { FileRssWriter } from "./scraper/writers/file-rss-writer.js";

const writer = new FileRssWriter();
const scraper = new Scraper(writer);
scraper.run();
