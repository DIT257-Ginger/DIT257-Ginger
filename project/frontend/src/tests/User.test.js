import User, { getCurrentUser, saveCurrentUser } from "../User";

test("store user and retrieve it again", async () => {
  const user = new User();
  user.trashCollected = 100;
  user.id = "kodapa";
  await saveCurrentUser(user);
  const data = await getCurrentUser();
  expect(data).toEqual(user);
});
