import {
  notifyAchievement,
  getAchievements,
  allAchievements,
} from "../features/achievements";
import { readCollectedAchievements, pushCollected } from "../persistence";
import AsyncStorage from "@react-native-community/async-storage";

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe("Getting one achievement", () => {
  test("if there are no acquired achievements, return empty arr ", async () => {
    const result = await readCollectedAchievements();
    expect(result).toEqual([]);
  });

  test("Notify with an empty array returns nothing ", async () => {
    await notifyAchievement([]);
    const emptyArr = await getAchievements();
    expect(emptyArr).toEqual([]);
  });

  test("getAchievements only returns items that have corresponding achievements", async () => {
    await notifyAchievement([
      {
        amount: 10,
        id: "3af87f4f-a83b-4ff1-8f42-393f4ca15154",
        time: 1602486346740,
        type: "bag",
      },
      {
        amount: 40,
        id: "717f6432-65d2-47de-ac52-9ac7bced3500",
        time: 1602486386704,
        type: "bag",
      },
    ]);

    await pushCollected([{ id: 18, hasCollected: true }]);

    const getArr = await getAchievements();
    const getMemory = await readCollectedAchievements();

    expect(allAchievements[2]).toStrictEqual(getArr[0]);
    expect(allAchievements[2].id).toStrictEqual(getMemory[0].id);
    expect(allAchievements[3]).toStrictEqual(getArr[1]);
    expect(allAchievements[3].id).toStrictEqual(getMemory[1].id);
  });

  test("Does not fulfill the condition of an achievement ", async () => {
    const empty = await readCollectedAchievements();
    await notifyAchievement([
      {
        amount: 2,
        id: "3af87f4f-a83b-4ff1-8f42-393f4ca15154",
        time: 1602486346740,
        type: "bag",
      },
      {
        amount: 3,
        id: "717f6432-65d2-47de-ac52-9ac7bced3500",
        time: 1602486386704,
        type: "bag",
      },
    ]);
    const notified = await readCollectedAchievements();

    expect(notified.length).toBe(empty.length);
  });

  test("Fulfills the condition of one achievement in one picking ", async () => {
    const empty = await readCollectedAchievements();
    await notifyAchievement([
      {
        id: "de9c03c1-d14a-48af-afe8-603bae7a50a3",
        type: "bag",
        amount: 10,
        time: 1602568894378,
      },
    ]);
    const notified = await readCollectedAchievements();

    expect(notified.length).toBeGreaterThan(empty.length);
  });

  test("Fulfills the condition of one achievement in two pickings ", async () => {
    const empty = await readCollectedAchievements();
    await notifyAchievement([
      {
        amount: 4,
        id: "3af87f4f-a83b-4ff1-8f42-393f4ca15154",
        time: 1602486346740,
        type: "bag",
      },
      {
        amount: 6,
        id: "717f6432-65d2-47de-ac52-9ac7bced3500",
        time: 1602486386704,
        type: "bag",
      },
    ]);
    const notified = await readCollectedAchievements();

    expect(notified.length).toBeGreaterThan(empty.length);
  });
  test("Two separate pickings will result in an achievement ", async () => {
    const empty = await readCollectedAchievements();
    await notifyAchievement([
      {
        amount: 4,
        id: "3af87f4f-a83b-4ff1-8f42-393f4ca15154",
        time: 1602486346740,
        type: "bag",
      },
    ]);
    await notifyAchievement([
      {
        amount: 4,
        id: "3af87f4f-a83b-4ff1-8f42-393f4ca15154",
        time: 1602486346740,
        type: "bag",
      },
      {
        amount: 6,
        id: "717f6432-65d2-47de-ac52-9ac7bced3500",
        time: 1602486386704,
        type: "bag",
      },
    ]);
    const notified = await readCollectedAchievements();

    expect(notified.length).toBeGreaterThan(empty.length);
  });
});

describe("Getting several achievements", () => {
  test("Is awarded two achievements in one picking ", async () => {
    const empty = await readCollectedAchievements();
    await notifyAchievement([
      {
        amount: 10,
        id: "3af87f4f-a83b-4ff1-8f42-393f4ca15154",
        time: 1602486346740,
        type: "bag",
      },
      {
        amount: 100,
        id: "717f6432-65d2-47de-ac52-9ac7bced3500",
        time: 1602486386704,
        type: "metalCan",
      },
    ]);
    const notified = await readCollectedAchievements();

    expect(notified.length).toBe(2);
  });

  test("Once grants many ", async () => {
    const expectedAchievements = [
      {
        id: "1",
        secret: false,
        title: "Tin Head",
        description: "Collect 100 metal cans.",
        condition: ["metalCan", 100],
        icon: 1,
        hasAquired: false,
      },
      {
        id: "2",
        secret: false,
        title: "Tree Hugger",
        description: "Collect 10 trash bags.",
        condition: ["bag", 10],
        icon: 1,
        hasAquired: false,
      },
      {
        id: "3",
        secret: false,
        title: "Trash Panda",
        description: "Collect 50 trash bags.",
        condition: ["bag", 50],
        icon: 1,
        hasAquired: false,
      },
    ];
    await notifyAchievement([
      {
        amount: 50,
        id: "33687f24-615c-40c0-bb8e-b3d82f5c3792",
        time: 1602486560789,
        type: "bag",
      },
      {
        amount: 100,
        id: "11030276-b9f3-4e3b-a88d-32ec27df75fe",
        time: 1602486562349,
        type: "metalCan",
      },
      {
        amount: 23,
        id: "9bb5c0ea-adac-4083-b4df-e399a91225c6",
        time: 1602486564711,
        type: "cigarette",
      },
      {
        amount: 1000,
        id: "cbd1e63f-2577-4baf-afea-408d51646e9a",
        time: 1602486565558,
        type: "candyWrapper",
      },
      {
        amount: 3,
        id: "72471b73-5144-4cb9-9fcc-22c1134fac26",
        time: 1602486566441,
        type: "battery",
      },
      {
        amount: 16,
        id: "3006a408-b0b4-41cc-9c4e-5b3dae56dbd9",
        time: 1602486567251,
        type: "level",
      },
    ]);
    const achievementObjects = await getAchievements();

    expect(expectedAchievements).toStrictEqual(achievementObjects);
  });
});

describe("Removal of achievements ", () => {
  test("Adding two removing one ", async () => {
    const remainingAchievement = [
      {
        id: "2",
        secret: false,
        title: "Tree Hugger",
        description: "Collect 10 trash bags.",
        condition: ["bag", 10],
        icon: 1,
        hasAquired: false,
      },
    ];
    await notifyAchievement([
      {
        amount: 50,
        id: "3af87f4f-a83b-4ff1-8f42-393f4ca15154",
        time: 1602486346740,
        type: "bag",
      },
    ]);
    const getTwo = await getAchievements();
    await notifyAchievement([
      {
        amount: 10,
        id: "3af87f4f-a83b-4ff1-8f42-393f4ca15154",
        time: 1602486346740,
        type: "bag",
      },
    ]);
    const getOne = await getAchievements();
    expect(getTwo.length).toBeGreaterThan(getOne.length);
    expect(getOne).toStrictEqual([
      {
        id: "2",
        secret: false,
        title: "Tree Hugger",
        description: "Collect 10 trash bags.",
        condition: ["bag", 10],
        icon: 1,
        hasAquired: false,
      },
    ]);
  });
});
