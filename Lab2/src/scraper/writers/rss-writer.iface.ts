import Parser from "rss-parser";

export interface IRssWriter {
  export(item : Parser.Item) : void;
}
