import { allAchievements } from "./AllAchievements";
import {
  writeCollectedAchievements,
  readCollectedAchievements,
  pushCollected,
} from "../../persistence";
import { AchievementGainedSignaler } from "./AchievementGainedSignaler";

/**
 * TODO
 * Will notify about some change to trashCount/lvl/date.
 * Will check if change fulfills requirement for granting achievement.
 * @param {Promise<Number>} trashCount -or lvl or date
 *
 * {id: 0, hasAquired: true}
 */
/* export async function notifyAchievement(trashCount) {
  for (var i = 0; i < allAchievements.length; i++) {
    if (allAchievements[i].condition <= Number(trashCount.toString())) {
      const id = allAchievements[i].id;
      console.log(id);
      const item = { id: allAchievements[i].id, hasCollected: true };
      //await writeCollectedAchievements(item);
      pushCollected(item);
    } else {
      //do nothing, nothing new has happened.
    }
  }
}

export async function getAchievements() {
  const collectedAchievements = await readCollectedAchievements();
  console.log("Contents of the memory: ");
  console.log(collectedAchievements);

  //findCorresponding(collectedAchievements);
  return collectedAchievements;
} 

async function findCorresponding(collectedAchievements) {
  console.log("hello");
  console.log(collectedAchievements);
  for (var i = 0; i < collectedAchievements.length; i++) {
    console.log("Index: " + collectedAchievements[i].id);
    console.log("Looking for the id .. ");
    //console.log(allAchievements.includes());

    if (allAchievements[i].id === x.id) {
      console.log("Found it");
    }
  }
}
*/

export async function notifyAchievement(trashCount) {
  console.log("The current trashCount is: ");
  console.log(trashCount);
  for (var i = 0; i < allAchievements.length; i++) {
    if (allAchievements[i].condition <= Number(trashCount.toString())) {
      allAchievements[i].hasAquired = true;
      console.log(allAchievements[i]);
    } else {
      //console.log(trashCount);
    }
  }
  acquireAchievement();
}

/**
 * Puts acquired achievements in list if not already in list.
 */
//one func for get from storage and one for updating achievements
//change storage to {id: x, hasCollected: true}
export async function acquireAchievement() {
  var lst = [];
  const stored = await readCollectedAchievements();
  console.log("Granted achievements collected from memory: ");
  console.log(stored.length);
  for (var i = 0; i < allAchievements.length; i++) {
    if (
      allAchievements[i].hasAquired == true &&
      !stored.includes(allAchievements[i])
    ) {
      lst.push(allAchievements[i]);
    }
  }
  //if the lst has achievements that are not stored yet
  if (lst.toString() !== stored.toString()) {
    console.log(stored);
    await writeCollectedAchievements(lst);
    console.log("New achievements granted! ");
    AchievementGainedSignaler.signal("1"); //send the id of the acquired achievement
    //return lst;
    //call object with all functions
  } else {
    console.log("No new achievements granted: ");
    console.log(lst.length);
  }
  return lst;
}
