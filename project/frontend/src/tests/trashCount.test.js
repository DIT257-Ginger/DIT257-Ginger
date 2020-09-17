import {
  writeTrashCount,
  readTrashCount,
} from "../persistence/local/trashCount";

test("store trash count and retrieve it", async () => {
  const inputTrashCount = 123;
  await writeTrashCount(inputTrashCount);
  const outputTrashCount = await readTrashCount();
  expect(outputTrashCount).toBe(inputTrashCount);
});

test("store trash count and retrieve it twice", async () => {
  const inputTrashCount = 47351;
  await writeTrashCount(inputTrashCount);
  const outputTrashCount = await readTrashCount();
  const outputTrashCount2 = await readTrashCount();
  expect(outputTrashCount).toBe(outputTrashCount2);
});

test("retrieve 0 trash count when storage is null", async () => {
  const inputTrashCount = null;
  await writeTrashCount(inputTrashCount);
  const outputTrashCount = await readTrashCount();
  expect(outputTrashCount).toBe(0);
});
