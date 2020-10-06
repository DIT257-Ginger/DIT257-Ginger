import { allAchievements } from "./AllAchievements";
import {
  writeCollectedAchievements,
  readCollectedAchievements,
} from "./AchivementStorage";

export const achivementSignaler = {
  functions: [],
  signal: async () => {
    this.functions.forEach(async (f) => await f());
  },
};

/**
 * TODO
 * Called when fetching the locally stored achivements.
 * @param {Promise<Number>} trashCount
 *
 */
export async function notifyAchivement(trashCount) {
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
  aquireAchievement();
}

/**
 * Puts aquired achievements in list if not already in list.
 */
//one func for get from storage and one for updating achievements
//change storage to {id: x, hasCollected: true}
export async function aquireAchievement() {
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
    // await achivementSignaler.signal();
    //return lst;
    //call achivements.js to reload
    //call object with all functions
  } else {
    console.log("No new achievements granted: ");
    console.log(lst.length);
  }
  return lst;
}
