export class TrashCollectionEntry {
  constructor(type, amount, time = Date.now()) {
    this.type = type;
    this.amount = amount;
    this.time = time;
  }
}
