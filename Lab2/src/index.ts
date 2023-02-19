import { Scraper } from "./scraper/scraper.js";
import { FileFeedItemWriter } from "./shared/writers/file-feed-item-writer.js";

const writer = new FileFeedItemWriter();
const scraper = new Scraper(writer);
scraper.run();
