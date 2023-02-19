import { Item } from "rss-parser";

export interface IFeedItemWriter {
  export(item : Item) : void;
}
