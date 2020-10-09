import { allAchievements } from "./AllAchievements";
import { readCollectedAchievements, pushCollected } from "../../persistence";
import { AchievementGainedSignaler } from "./AchievementGainedSignaler";

/**
 * Processes updates from functions that could result in
 * the user getting a new achievement.
 * @param {Promise<Array{String, Number}]>} - all stored entries
 */
export async function notifyAchievement(trashEntries) {
  const collectedTrash = await sortTrashTypes(await trashEntries);
  for (var i = 0; i < allAchievements.length; i++) {
    if (
      collectedTrash.some(
        (entry) =>
          entry.amount >= allAchievements[i].condition[1] &&
          entry.type == allAchievements[i].condition[0]
      )
    ) {
      await updateAchievements(allAchievements[i].id);
    }
  }
}

/**
 * Creates a list containing the trash-types and how many times
 * each one has been collected.
 * @param {Promise<Array{String, Number}]>}
 */
async function sortTrashTypes(trashEntries) {
  const trashTypes = [
    { type: "bag", amount: 0 },
    { type: "battery", amount: 0 },
    { type: "cigarette", amount: 0 },
    { type: "candyWrapper", amount: 0 },
    { type: "metalCan", amount: 0 },
  ];
  for (var i = 0; i < (await trashEntries.length); i++) {
    if (trashEntries[i].type == "bag") {
      trashTypes[0].amount += trashEntries[i].amount;
    }
    if (trashEntries[i].type == "battery") {
      trashTypes[1].amount += trashEntries[i].amount;
    }
    if (trashEntries[i].type == "cigarette") {
      trashTypes[2].amount += trashEntries[i].amount;
    }
    if (trashEntries[i].type == "candyWrapper") {
      trashTypes[3].amount += trashEntries[i].amount;
    }
    if (trashEntries[i].type == "metalCan") {
      trashTypes[4].amount += trashEntries[i].amount;
    }
  }
  return trashTypes;
}

/**
 * Adds newly acquired achievements persistent storage.
 * The object being pushed to memory: {id: id, hasCollected:true}
 * Will also send a signal for each one.
 * @param {Promise<Number>} id - the id of the achievement
 */
async function updateAchievements(id) {
  //const collected = await getAchievements();
  const collected = await getAchievements();
  if (!collected.some((item) => item.id === id)) {
    const item = { id: id, hasCollected: true };
    await pushCollected(item);
    console.log(allAchievements[id].id);
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
