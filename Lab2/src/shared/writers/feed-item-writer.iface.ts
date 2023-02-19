import { Item } from "rss-parser";

export interface IFeedItemWriter {
  write(id : string, item : Item) : void;
}
