import { getTrashTypes } from "./trashTypes";
import { TrashCollectionEntry } from "./TrashCollectionEntry";
import {
  pushToCollectedTrash,
  readCollectedTrash,
  writeCollectedTrash,
  writeTrashCount,
  incrementTrashCount,
} from "../../persistence";
import { notifyAchivement } from "../../achivementHandling/NotifyAchivement";

const trashValues = getTrashTypes().reduce((trashValObj, type) => {
  trashValObj[type.id] = type.value;
  return trashValObj;
}, {});

// collected trash format:
// Array of TrashCollectionEntry:
// {"type": {string, valid trash type}, "amount": {number > 0}, "time": {number, ms since 1970}}

/**
 * Function used when user has collected new trash.
 * Adds new persistent trash collection entry and updates persistent trash count.
 * @param {String} type - id of trash type to collect
 * @param {Number} amount - how many were collected
 */
export async function collect(type, amount) {
  const newTrash = new TrashCollectionEntry(type, amount);
  await pushToCollectedTrash(newTrash);
  const value = getValue(newTrash);
  await incrementTrashCount(value);
  notifyAchivement(await calculateTrashCount()); //signals change
}

/**
 * Sets persistent trash count to sum of persistent collected trash.
 */
export async function refreshTrashCount() {
  const trashCount = await calculateTrashCount();
  await writeTrashCount(trashCount);
}

/**
 * Calculates sum of persistent collected trash values.
 * @returns {Promise<Number>} - sum of persistent collected trash values.
 */
async function calculateTrashCount() {
  const collectedTrash = await readCollectedTrash();
  if (collectedTrash.length === 0) {
    return 0;
  }
  const collectedTrashValues = collectedTrash.map(getValue);
  return collectedTrashValues.reduce((a, b) => a + b);
}

/**
 * Removes the latest collection entry from persistent collected trash and
 * updates persistent trash count accordingly.
 * @returns {Promise<TrashCollectionEntry>} - removed trash collection entry or undefined
 */
export async function undoLastCollect() {
  const collectedTrash = await readCollectedTrash();
  const lastCollect = collectedTrash.pop();
  await writeCollectedTrash(collectedTrash);
  await refreshTrashCount();
  return lastCollect;
}

/**
 * Removes all trash collection entries older than 'time' from persistent collected
 * trash and updates persistent trash count accordingly.
 * @param {Number} time - time to remove from, in ms since 1970.
 * @returns {Promise<Array<TrashCollectionEntry>>} - removed trash collection entries
 */
export async function undoCollectsFrom(time) {
  const collectedTrash = await readCollectedTrash();
  const undoneCollections = [];
  while (
    collectedTrash.length >= 1 &&
    collectedTrash[collectedTrash.length - 1].time >= time
  ) {
    undoneCollections.push(collectedTrash.pop());
  }
  await writeCollectedTrash(collectedTrash);
  await refreshTrashCount();
  return undoneCollections;
}

/**
 * Takes a trash collection entry and gives its value.
 * @param {TrashCollectionEntry} entry - entry to get value of
 * @returns {Number} - value of 'entry'
 */
function getValue(entry) {
  return trashValues[entry.type] * entry.amount;
}
