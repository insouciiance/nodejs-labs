import Parser from "rss-parser";
import { IRssWriter } from "./rss-writer.iface.js";

export class ConsoleRssWriter implements IRssWriter {
  export(item : Parser.Item) {
    console.log(JSON.stringify(item, null, 2));
  }
}
