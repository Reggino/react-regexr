import { RegexrEvent } from "./RegexrEvent";

export class RegexrDataEvent extends RegexrEvent {
  private data: string;
  constructor(type: string, data: string) {
    super(type);
    this.data = data;
  }
}
