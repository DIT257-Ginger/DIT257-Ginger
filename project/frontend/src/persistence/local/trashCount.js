import { AsyncStorage } from "react-native";

const TRASH_COUNT_KEY = "current_user";

export async function writeTrashCount(trashCount) {
  const trashString = JSON.stringify(trashCount);
  await AsyncStorage.setItem(TRASH_COUNT_KEY, trashString);
}

export async function readTrashCount() {
  const trashString = await AsyncStorage.getItem(TRASH_COUNT_KEY);
  if (trashString === null) {
    return 0;
  }

  return JSON.parse(trashString);
}
