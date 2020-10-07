//import { AchievementHandler } from "./AchievementHandler";
/**
 * Contains list of all achievement-objects
 * Function for putting acquired achievement in list, which
 * is sent to Achievements.js
 */
const allAchievements = [
  {
    id: "0",
    secret: false,
    title: "Good start 👏",
    description: "Collect 10 bags of trash",
    condition: 10, //TODO [type,amount]
    icon: require("../../../assets/trash.png"),
  },
  {
    id: "1",
    secret: false,
    title: "Keep going",
    description: "Collect 20 bags of trash",
    condition: 20,
    icon: require("../../../assets/idleGif.gif"),
  },
  {
    id: "2",
    secret: true,
    title: "Recycler",
    description: "Read about recycling in main menu",
    condition: 25,
    icon: require("../../../assets/pickit1.png"),
    hasAquired: false,
  },
  {
    id: "3",
    secret: false,
    title: "Trash master",
    description: "Collect 5000000 bags of trash 😋",
    condition: 5000000,
    icon: require("../../../assets/idleGif.gif"),
    hasAquired: false,
  },
  {
    id: "4",
    secret: false,
    title: "Keep going",
    description: "Collect 30 bags of trash",
    condition: 30,
    icon: require("../../../assets/pickit1.png"),
    hasAquired: false,
  },
  {
    id: "5",
    secret: true,
    title: "S.E.C.R.E.T.",
    description: "Collect 35 bags of trash",
    condition: 35,
    icon: require("../../../assets/trash.png"),
    hasAquired: false,
  },
  {
    id: "6",
    secret: false,
    title: "Good 1640",
    description: "Collect 40 bags of trash",
    condition: 40,
    icon: require("../../../assets/trash.png"),
    hasAquired: false,
  },
  {
    id: "7",
    secret: false,
    title: "Good 1660",
    description: "Collect 45 bags of trash",
    condition: 45,
    icon: require("../../../assets/trash.png"),
    hasAquired: false,
  },
];

export { allAchievements };
