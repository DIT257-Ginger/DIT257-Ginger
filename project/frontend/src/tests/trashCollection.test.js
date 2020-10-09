import { writeTrashCount, readTrashCount } from "../persistence";
import {
  collect,
  undoLastCollect,
  undoCollectsFrom,
  undoCollect,
} from "../features/trashCollection/trashCollection";
import { writeCollectedTrash, readCollectedTrash } from "../persistence";

beforeEach(async () => {
  await writeTrashCount(0);
  await writeCollectedTrash([]);
});

test("Collect many and check that IDs are unique", async () => {
  const type = "bag";
  for (let index = 0; index < 1000; index++) {
    await collect(type, 1);
  }

  const ids = (await readCollectedTrash()).map((entry) => entry.id);
  expect(ids.length).toBe(new Set(ids).size);
});

test("Collect 1 bag and see if trashCount is 1", async () => {
  await collect("bag", 1);

  const trashCount = await readTrashCount();
  expect(trashCount).toBe(1);
});

test("Collect 1 bag and see if it is added to collected trash with the correct properties", async () => {
  const type = "bag";

  const timePreCollect = Date.now();
  await collect(type, 1);
  const timePostCollect = Date.now();

  const collectedTrash = await readCollectedTrash();

  expect(collectedTrash.length).toBe(1);
  expect(typeof collectedTrash[0].id).toBe("string");
  expect(collectedTrash[0].id).not.toHaveLength(0);
  expect(collectedTrash[0].amount).toBe(1);
  expect(collectedTrash[0].type).toBe(type);
  expect(collectedTrash[0].time).toBeGreaterThanOrEqual(timePreCollect);
  expect(collectedTrash[0].time).toBeLessThanOrEqual(timePostCollect);
});

test("Collect twice then undo last collect and see how many collections are left", async () => {
  const type = "bag";
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
  await collect(type, 1);
  await collect(type, 1);

  expect(await readTrashCount()).toBe(2);

  await undoLastCollect();

  expect(await readTrashCount()).toBe(1);
});

test("undo 2 collection entries using undoCollectFrom and see how many are left", async () => {
  const type = "bag";
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

  await collect(type, 1);
  await collect(type, 1);
  await collect(type, 1);
  await collect(type, 1);

  expect(await readTrashCount()).toBe(4);

  await undoCollectsFrom(0);

  expect(await readTrashCount()).toBe(0);
});

test("undoCollect with id that does not exist returns undefined", async () => {
  expect(await undoCollect("HELLO THIS ID DOES NOT EXIST")).toBe(undefined);
  expect(await undoCollect("")).toBe(undefined);
});

test("Collect once and undo collect by id and check length", async () => {
  const entry = await collect("bag", 1);
  expect(await readCollectedTrash()).toHaveLength(1);

  await undoCollect(entry.id);
  expect(await readCollectedTrash()).toHaveLength(0);
});

test("Collect twice then undo last collect by id and check length and that the right one is removed", async () => {
  const type = "bag";
  const entryToKeep = await collect(type, 1);
  const entryToUndo = await collect(type, 1);
  expect(await readCollectedTrash()).toHaveLength(2);

  await undoCollect(entryToUndo.id);

  const entriesLeft = await readCollectedTrash();
  expect(entriesLeft).toHaveLength(1);
  expect(entriesLeft[0].id).toBe(entryToKeep.id);
});

test("Collect many then undo in between and check length and that the right one is removed", async () => {
  const toIds = (entries) => entries.map((entry) => entry.id);
  const readIds = async () => toIds(await readCollectedTrash());

  const type = "bag";
  const entry1 = await collect(type, 234); // Undo
  const entry2 = await collect(type, 22);
  const entry3 = await collect(type, 53453); // Undo
  const entry4 = await collect(type, 45);
  const entry5 = await collect(type, 564); // Undo
  const entry6 = await collect(type, 1);
  const entry7 = await collect(type, 3);
  expect(readCollectedTrash()).resolves.toHaveLength(7);

  await undoCollect(entry3.id);
  expect(readCollectedTrash()).resolves.toHaveLength(6);
  expect(readIds()).resolves.not.toContain(entry3.id);

  await undoCollect(entry5.id);
  expect(readCollectedTrash()).resolves.toHaveLength(5);
  expect(readIds()).resolves.not.toContain(entry5.id);

  await undoCollect(entry1.id);
  expect(readCollectedTrash()).resolves.toHaveLength(4);
  expect(readIds()).resolves.not.toContain(entry1.id);

  expect(readIds()).resolves.toContain(entry2.id);
  expect(readIds()).resolves.toContain(entry4.id);
  expect(readIds()).resolves.toContain(entry6.id);
  expect(readIds()).resolves.toContain(entry7.id);
});

test("Undo collect by id updates trash count", async () => {
  const type = "bag";
  const entry = await collect(type, 3);
  await collect(type, 2);

  await undoCollect(entry.id);

  expect(await readTrashCount()).toBe(2);
});
