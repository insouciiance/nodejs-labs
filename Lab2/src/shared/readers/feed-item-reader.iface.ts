import { Item } from "rss-parser";

export interface IFeedItemReader {
  enumerateIds() : Iterable<string>;
  read(id : string) : Item;
}
