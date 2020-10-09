import AsyncStorage from "@react-native-community/async-storage";
import { TrashCollectionEntry } from "../../features/trashCollection/TrashCollectionEntry";

const COLLECTED_TRASH_KEY = "collected_trash";

// collected trash format:
// Array of TrashCollectionEntry:
// {"id": {UUID v4}, "type": {string, valid trash type}, "amount": {number > 0}, "time": {number, ms since 1970}}

/**
 * Reads the locally stored persistent array of trash collection entries.
 * @returns {Promise<Array<TrashCollectionEntry>>} - the stored array of trash collection entries
 */
export async function readCollectedTrash() {
  const collectedTrashString = await AsyncStorage.getItem(COLLECTED_TRASH_KEY);
  if (
    collectedTrashString === null ||
    JSON.parse(collectedTrashString) === null
  ) {
    return [];
  }

  return JSON.parse(collectedTrashString).map((obj) =>
    Object.assign(new TrashCollectionEntry(), obj)
  );
}

/**
 * Sets the locally stored persistent array of trash collection entries.
 * @param {Array<TrashCollectionEntry>} collectedTrash - new array of trash collection entries
 */
export async function writeCollectedTrash(collectedTrash) {
  const collectedTrashString = JSON.stringify(collectedTrash);
  await AsyncStorage.setItem(COLLECTED_TRASH_KEY, collectedTrashString);
}

/**
 * Pushes a trash collection entry to the locally stored persistent array of trash collection entries.
 * @param {TrashCollectionEntry} entry - new array of trash collection entries
 */
export async function pushToCollectedTrash(entry) {
  const collectedTrash = await readCollectedTrash();
  collectedTrash.push(entry);
  await writeCollectedTrash(collectedTrash);
}
