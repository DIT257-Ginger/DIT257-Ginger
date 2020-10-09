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
    title: "Rubbish Recycler",
    description: "Read the Recycling Information Window.",
    condition: ["Avid reader", 100],
    icon: require("../../../assets/trashAchievementImages/rubbishrecycler.png"),
    hasAquired: false,
  },
  {
    id: "1",
    secret: false,
    title: "Tin Head",
    description: "Collect 100 metal cans.",
    condition: ["metalCan", 100],
    icon: require("../../../assets/trashAchievementImages/tinhead.png"),
    hasAquired: false,
  },
  {
    id: "2",
    secret: false,
    title: "Tree Hugger",
    description: "Collect 10 trash bags.",
    condition: ["bag", 10],
    icon: require("../../../assets/trashAchievementImages/treehugger.png"),
    hasAquired: false,
  },
  {
    id: "3",
    secret: false,
    title: "Trash Panda",
    description: "Collect 50 trash bags.",
    condition: ["bag", 50],
    icon: require("../../../assets/trashAchievementImages/trashpanda.png"),
    hasAquired: false,
  },
  {
    id: "4",
    secret: false,
    title: "Bronze",
    description: "Collect 100 trash bags.",
    condition: ["bag", 100],
    icon: require("../../../assets/trashAchievementImages/brons.png"),
    hasAquired: false,
  },
  {
    id: "5",
    secret: false,
    title: "Silver",
    description: "Collect 250 trash bags.",
    condition: ["bag", 250],
    icon: require("../../../assets/trashAchievementImages/silver.png"),
    hasAquired: false,
  },
  {
    id: "6",
    secret: false,
    title: "Silver",
    description: "Collect 250 trash bags.",
    condition: ["bag", 250],
    icon: require("../../../assets/trashAchievementImages/silver.png"),
    hasAquired: false,
  },
  {
    id: "7",
    secret: false,
    title: "Gold",
    description: "Collect 500 trash bags.",
    condition: ["bag", 500],
    icon: require("../../../assets/trashAchievementImages/gold.png"),
    hasAquired: false,
  },
  {
    id: "8",
    secret: false,
    title: "Platinum",
    description: "Collect 1000 trash bags.",
    condition: ["bag", 1000],
    icon: require("../../../assets/trashAchievementImages/platinum.png"),
    hasAquired: false,
  },
  {
    id: "9",
    secret: false,
    title: "Diamond",
    description: "Collect 5000 trash bags.",
    condition: ["bag", 5000],
    icon: require("../../../assets/trashAchievementImages/diamond.png"),
    hasAquired: false,
  },
  {
    id: "10",
    secret: false,
    title: "Trash Master",
    description: "Collect 10000 trash bags.",
    condition: ["bag", 10000],
    icon: require("../../../assets/trashAchievementImages/trashmaster.png"),
    hasAquired: false,
  },
];

export { allAchievements };