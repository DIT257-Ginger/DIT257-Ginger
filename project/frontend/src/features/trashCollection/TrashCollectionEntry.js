export class TrashCollectionEntry {
  constructor(id, type, amount, time = Date.now()) {
    this.id = id;
    this.type = type;
    this.amount = amount;
    this.time = time;
  }
}
