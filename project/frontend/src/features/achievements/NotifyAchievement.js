import { allAchievements } from "./AllAchievements";
import { readCollectedAchievements, pushCollected } from "../../persistence";
import { AchievementGainedSignaler } from "./AchievementGainedSignaler";

/**
 * Processes updates from functions that could result in
 * the user getting a new achievement.
 * @param {Promise<Number>} condition - trashCount, trashType or lvl
 */
export async function notifyAchievement(trashCount) {
  //console.log("The current trashCount is: ");
  //console.log(trashCount);
  for (var i = 0; i < allAchievements.length; i++) {
    if (allAchievements[i].condition <= Number(trashCount.toString())) {
      await updateAchievements(allAchievements[i].id);
    }
  }
}

/**
 * Adds newly acquired achievements persistent storage.
 * The object being pushed to memory: {id: id, hasCollected:true}
 * Will also send a signal for each one.
 * @param {Promise<Number>} id - the id of the achievement
 */
async function updateAchievements(id) {
  const collected = await getAchievements();
  if (!collected.some((item) => item.id === id)) {
    const item = { id: id, hasCollected: true };
    await pushCollected(item);
    AchievementGainedSignaler.signal(allAchievements[id].id);
  }
}

/**
 * Returns all acquired achievements stored persistently.
 * @returns {Promise<[collectedAchievements]>}
 * - the entire achievement-object, not just id.
 */
export async function getAchievements() {
  const storedAchievements = await readCollectedAchievements();
  const collectedAchievements = [];
  //console.log("Contents of the memory: ");
  //console.log(storedAchievements);
  await storedAchievements.forEach((element) => {
    if (allAchievements.some((allItem) => allItem.id === element.id)) {
      collectedAchievements.push(element);
    }
  });
  return await getCorresponding(collectedAchievements);
}

/**
 * Will return the the achievements which the stored id corresponds to.
 * @param {Promise<[]>} collectedAchievements - achievements from persistence.
 */
async function getCorresponding(collectedAchievements) {
  const correspondingAchievement = [];
  allAchievements.forEach((element) => {
    if (collectedAchievements.some((cItem) => cItem.id === element.id)) {
      correspondingAchievement.push(element);
    }
  });
  return correspondingAchievement;
}
