import {
  writeTrashCount,
  readTrashCount,
} from "../persistence/local/trashCount";
import {
  getLevel,
  getPercentProgressToNextLevel,
  getTrashRequiredForNextLevel,
} from "../features/leveling";

test("Test diminishing returns", async () => {
  const initialLevel = await getLevel();
  const inputTrashCount = 100;
  await writeTrashCount(inputTrashCount);
  const levelAfterFstCollect = await getLevel();
  const levelGainAfterFstCollect = levelAfterFstCollect - initialLevel;
  await writeTrashCount((await readTrashCount()) + inputTrashCount);
  const levelAfterSndCollect = await getLevel();
  const levelGainAfterSndCollect = levelAfterSndCollect - levelAfterFstCollect;

  expect(levelGainAfterFstCollect).toBeGreaterThan(levelGainAfterSndCollect);
});

test("Progress to next level increases when trash is collected and user does not level up", async () => {
  const initialTrashCounts = [...Array(100).keys()];
  const trashCountIncrements = [...Array(10).keys()];
  trashCountIncrements.forEach(async (trashCountIncrement) => {
    initialTrashCounts.forEach(async (initialTrashCount) => {
      await writeTrashCount(initialTrashCount);
      const initialLevel = await getLevel();
      const initialProgress = await getPercentProgressToNextLevel;
      await writeTrashCount((await readTrashCount()) + trashCountIncrement);
      const levelAfterCollect = await getLevel();
      const progressAfterCollect = await getPercentProgressToNextLevel;
      if (initialLevel === levelAfterCollect) {
        expect(progressAfterCollect).toBeGreaterThan(initialProgress);
      }
    });
  });
});

test("Trash required to next level decreases by the correct amount when trash is collected and user does not level up", async () => {
  const initialTrashCounts = [...Array(100).keys()];
  const trashCountIncrements = [...Array(10).keys()];
  trashCountIncrements.forEach(async (trashCountIncrement) => {
    initialTrashCounts.forEach(async (initialTrashCount) => {
      await writeTrashCount(initialTrashCount);
      const initialLevel = await getLevel();
      const initialTrashRequiredForNextLevel = await getTrashRequiredForNextLevel();
      await writeTrashCount((await readTrashCount()) + trashCountIncrement);
      const levelAfterCollect = await getLevel();
      const trashRequiredForNextLevelAfterCollect = await getTrashRequiredForNextLevel();
      if (initialLevel === levelAfterCollect) {
        expect(trashRequiredForNextLevelAfterCollect).toBe(
          initialTrashRequiredForNextLevel - trashCountIncrement
        );
      }
    });
  });
});
