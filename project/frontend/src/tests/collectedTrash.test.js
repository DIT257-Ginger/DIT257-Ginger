import { TrashCollectionEntry } from "../features/trashCollection";
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

test("value from read is of type Array<TrashCollectionEntry>", async () => {
  const inputTrash = [
    new TrashCollectionEntry("test_type1", 5),
    new TrashCollectionEntry("test_type2", 10),
    new TrashCollectionEntry("test_type3", 1),
    new TrashCollectionEntry("test_type4", 2),
    new TrashCollectionEntry("test_type5", 1000),
  ];
  await writeCollectedTrash(inputTrash);

  const outputTrash = await readCollectedTrash();

  expect(outputTrash).toBeInstanceOf(Array);
  for (const trashEntry of outputTrash) {
    expect(trashEntry).toBeInstanceOf(TrashCollectionEntry);
  }
});
