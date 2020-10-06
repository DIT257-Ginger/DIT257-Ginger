//import { AchievementHandler } from "./AchievementHandler";
/**
 * Contains list of all achievement-objects
 * Function for putting aquired achievement in list, which
 * is sent to Achievements.js
 */
const allAchievements = [
  {
    id: "0",
    secret: false,
    title: "Good start 👏",
    description: "Collect 10 bags of trash",
    condition: 10, //TODO [type,ammount]
    icon: require("../../assets/trash.png"),
  },
  {
    id: "1",
    secret: false,
    title: "Keep going",
    description: "Collect 20 bags of trash",
    condition: 20,
    icon: require("../../assets/idleGif.gif"),
  },
  {
    id: "2",
    secret: true,
    title: "Recycler",
    description: "Read about recycling in main menu",
    condition: "accessed recycling-info",
    icon: require("../../assets/leaflogo_1.png"),
    hasAquired: false,
  },
  {
    id: "3",
    secret: false,
    title: "Trash master",
    description: "Collect 5000000 bags of trash 😋",
    condition: 5000000,
    icon: require("../../assets/idleGif.gif"),
    hasAquired: false,
  },
  {
    id: "4",
    secret: false,
    title: "Keep going",
    description: "Collect 20 bags of trash",
    condition: 20,
    icon: require("../../assets/leaflogo_1.png"),
    hasAquired: false,
  },
  {
    id: "5",
    secret: true,
    title: "S.E.C.R.E.T.",
    description: "Collect 10 bags of trash",
    condition: 10,
    icon: require("../../assets/trash.png"),
    hasAquired: false,
  },
  {
    id: "6",
    secret: false,
    title: "Good 1640",
    description: "Collect 1640 bags of trash",
    condition: 1640,
    icon: require("../../assets/trash.png"),
    hasAquired: false,
  },
  {
    id: "7",
    secret: false,
    title: "Good 1660",
    description: "Collect 1660 bags of trash",
    condition: 1660,
    icon: require("../../assets/trash.png"),
    hasAquired: false,
  },
];

/*const handler = AchievementHandler();
handler.addAchievement(
  false,
  "Good start 👏",
  "Collect 10 bags of trash",
  require("../../assets/trash.png")
);
const listA = handler.getAchivementList();
console.log(listA);*/

export { allAchievements };
