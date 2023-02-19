import { INTERVAL_SECONDS, RSS_URI } from "./config.js";
import Parser from "rss-parser";
import { IFeedItemWriter } from "../shared/writers/feed-item-writer.iface.js";

export class Scraper {
  private parser : Parser = new Parser();
  private rssWriter : IFeedItemWriter;

  constructor(rssWriter : IFeedItemWriter) {
    this.rssWriter = rssWriter;
  }
  
  run() {
    setInterval(() => {
      this.parser.parseURL(RSS_URI).then(feed => {
        feed.items.forEach(item => this.rssWriter.export(item))
      });
    }, INTERVAL_SECONDS * 1000);
  }
}
