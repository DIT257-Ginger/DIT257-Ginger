import AsyncStorage from "@react-native-community/async-storage";

const ACHIEVEMENT_STORAGE_KEY = "achievementList";

/**
 * Stores the list of aquired achievements locally.
 * @param {[achievement]} achievementList  - the list of collected achievements
 */
export async function writeCollectedAchievements(achievementList) {
  const achievementString = JSON.stringify(achievementList);
  await AsyncStorage.setItem(ACHIEVEMENT_STORAGE_KEY, achievementString);
  //console.log("ITEM ADDED TO STORAGE: ");
  //console.log(achievementList);
}

export async function readCollectedAchievements() {
  const achievementString = await AsyncStorage.getItem(ACHIEVEMENT_STORAGE_KEY);
  if (achievementString === null || JSON.parse(achievementString) === null) {
    return 0;
  }
  //console.log("ITEMS RETRIEVED FROM STORAGE: ");
  //console.log(achievementString);
  return JSON.parse(achievementString);
}
