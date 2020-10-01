import { allAchievements } from "./AllAchievements";
import {
  writeCollectedAchievements,
  readCollectedAchievements,
} from "./AchivementStorage";

export default function NotifyAchivement(trashCount) {
  for (var i = 0; i < allAchievements.length; i++) {
    if (allAchievements[i].condition <= Number(trashCount.toString())) {
      allAchievements[i].hasAquired = true;
    } else {
      //console.log("Keep picking, you'll get there.");
    }
  }
  aquireAchievement();
}

/**
 * Puts aquired achievements in list if not already in list.
 */
export async function aquireAchievement() {
  var lst = [];
  var stored = await readCollectedAchievements();
  console.log("Contents of the memory: ");
  console.log(stored.length);
  for (var i = 0; i < allAchievements.length; i++) {
    if (
      allAchievements[i].hasAquired == true &&
      !stored.includes(allAchievements[i])
    ) {
      lst.push(allAchievements[i]);
    }
  }
  if (lst.toString() !== stored.toString()) {
    await writeCollectedAchievements(lst);
    return lst;
  } else {
    return stored;
  }
}
