import { Item } from "rss-parser";
import { IFeedItemWriter } from "./feed-item-writer.iface.js";

export class ConsoleFeedItemWriter implements IFeedItemWriter {
  export(item : Item) {
    console.log(JSON.stringify(item, null, 2));
  }
}
