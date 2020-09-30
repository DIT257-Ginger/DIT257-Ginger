import {
  writeCollectedTrash,
  readCollectedTrash,
} from "../persistence/local/collectedTrash";

test("retrieve [] from read when storage is null", async () => {
  const inputTrashCount = null;
  await writeCollectedTrash(inputTrashCount);
  const outputTrashCount = await readCollectedTrash();
  expect(outputTrashCount).toStrictEqual([]);
});
