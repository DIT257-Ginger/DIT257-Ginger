import AsyncStorage from "@react-native-community/async-storage";

const TRASH_COUNT_KEY = "trash_count";

/**
 * Sets the locally stored persistent trash count
 * @param {number} trashCount - value to be stored
 */
export async function writeTrashCount(trashCount) {
  const trashString = JSON.stringify(trashCount);
  await AsyncStorage.setItem(TRASH_COUNT_KEY, trashString);
}

/**
 * Reads the locally stored persistent trash count.
 * @returns {Promise<number>} the stored value
 */
export async function readTrashCount() {
  const trashString = await AsyncStorage.getItem(TRASH_COUNT_KEY);
  if (trashString === null || JSON.parse(trashString) === null) {
    return 0;
  }

  return JSON.parse(trashString);
}

/**
 * Increments the locally stored persistent trash count
 * @param {number} amount - how much to increment trash count
 */
export async function incrementTrashCount(amount) {
  await writeTrashCount(await readTrashCount() + amount)
}