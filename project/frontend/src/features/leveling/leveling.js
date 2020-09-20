import { readTrashCount } from "../../persistence";

trashToLevelFunction = (trash) => -0.5 + Math.sqrt(2 * trash + 0.25);

levelToTrashFunction = (level) => 0.5 * level + 0.5 * level * level;

/**
 * Takes trashcount and returns a level
 * @param {number} trashCount - amount of trash
 * @returns {number} - corresponding level
 */
function trashCountToLevel(trashCount) {
  return Math.floor(trashToLevelFunction(trashCount));
}

/**
 * Reads the users trashcount
 * and @returns the corresponding level of user
 */
export async function getLevel() {
  const trashCount = await readTrashCount();
  return trashCountToLevel(trashCount);
}

/**
 * Function for determining how much trash is required for the user to
 * progress to the next level.
 * @returns {number} - amount of trash required until user reaches next level
 */
export async function getTrashRequiredForNextLevel() {
  const nextLevel = (await getLevel()) + 1;
  const trashCountForNextLevel = levelToTrashFunction(nextLevel);
  const currentTrashCount = await readTrashCount();
  return trashCountForNextLevel - currentTrashCount;
}

/**
 * Function for determining the procent progress for next level
 * @returns {number} - progress for next level
 */
export async function getPercentProgressToNextLevel() {
  const trashCount = await readTrashCount();
  const currentLevel = trashCountToLevel(trashCount);
  const progressToNextLevel = trashToLevelFunction(trashCount) - currentLevel;
  return progressToNextLevel * 100;
}
