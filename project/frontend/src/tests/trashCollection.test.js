import { writeTrashCount, readTrashCount } from "../persistence";
import {
  collect,
  undoLastCollect,
  undoCollectsFrom,
} from "../features/trashCollection/trashCollection";
import { writeCollectedTrash, readCollectedTrash } from "../persistence";

test("Collect 1 bag and see if trashCount is 1", async () => {
  await writeTrashCount(0);
  await writeCollectedTrash([]);

  await collect("bag", 1);

  const trashCount = await readTrashCount();
  expect(trashCount).toBe(1);
});

test("Collect 1 bag and see if it is added to collected trash with the correct properties", async () => {
  const type = "bag";
  await writeTrashCount(0);
  await writeCollectedTrash([]);

  const timePreCollect = Date.now();
  await collect(type, 1);
  const timePostCollect = Date.now();

  const collectedTrash = await readCollectedTrash();

  expect(collectedTrash.length).toBe(1);
  expect(collectedTrash[0].amount).toBe(1);
  expect(collectedTrash[0].type).toBe(type);
  expect(collectedTrash[0].time).toBeGreaterThanOrEqual(timePreCollect);
  expect(collectedTrash[0].time).toBeLessThanOrEqual(timePostCollect);
});

test("Collect twice then undo last collect and see how many collections are left", async () => {
  const type = "bag";
  await writeTrashCount(0);
  await writeCollectedTrash([]);
  await collect(type, 1);
  await collect(type, 1);

  const preUndoCollectedTrash = await readCollectedTrash();
  expect(preUndoCollectedTrash.length).toBe(2);

  await undoLastCollect();

  const postUndoCollectedTrash = await readCollectedTrash();
  expect(postUndoCollectedTrash.length).toBe(1);
});

test("Undo collect updates trash count", async () => {
  const type = "bag";
  await writeTrashCount(0);
  await writeCollectedTrash([]);
  await collect(type, 1);
  await collect(type, 1);

  expect(await readTrashCount()).toBe(2);

  await undoLastCollect();

  expect(await readTrashCount()).toBe(1);
});

test("undo 2 collection entries using undoCollectFrom and see how many are left", async () => {
  const type = "bag";
  await writeTrashCount(0);
  await writeCollectedTrash([]);

  await collect(type, 1);

  await new Promise((resolve) => setTimeout(resolve, 10)); // waits 10 ms so the first entry isn't included in time
  const timePostFirstCollect = Date.now();

  await collect(type, 1);
  await collect(type, 1);

  const preUndoCollectedTrash = await readCollectedTrash();
  expect(preUndoCollectedTrash.length).toBe(3);

  await undoCollectsFrom(timePostFirstCollect);

  const postUndoCollectedTrash = await readCollectedTrash();
  expect(postUndoCollectedTrash.length).toBe(1);
});

test("undo 2 collection entries using undoCollectFrom and check trashCount", async () => {
  const type = "bag";
  await writeTrashCount(0);
  await writeCollectedTrash([]);

  await collect(type, 1);

  await new Promise((resolve) => setTimeout(resolve, 10)); // waits 10 ms so the first entry isn't included in time
  const timePostFirstCollect = Date.now();

  await collect(type, 1);
  await collect(type, 1);

  expect(await readTrashCount()).toBe(3);

  await undoCollectsFrom(timePostFirstCollect);

  expect(await readTrashCount()).toBe(1);
});

test("undo all collection entries using undoCollectFrom and check trashCount", async () => {
  const type = "bag";
  await writeTrashCount(0);
  await writeCollectedTrash([]);

  await collect(type, 1);
  await collect(type, 1);
  await collect(type, 1);
  await collect(type, 1);

  expect(await readTrashCount()).toBe(4);

  await undoCollectsFrom(0);

  expect(await readTrashCount()).toBe(0);
});
