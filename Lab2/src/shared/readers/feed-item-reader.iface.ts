import { Item } from "rss-parser";

export interface IFeedItemReader {
  enumerateItems() : Iterable<Item>
}
