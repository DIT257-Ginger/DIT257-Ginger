import { AsyncStorage } from "react-native";

export default class User {
  constructor() {
    this._id = "";
    this._trashCollected = 0;
  }
  set id(val) {
    this._id = val;
  }
  set trashCollected(val) {
    this._trashCollected = val;
  }
  get id() {
    return this._id;
  }

  get trashCollected() {
    return this._trashCollected;
  }

  incrementTrash() {
    this._trashCollected++;
    console.log(this);
  }
}

const STORAGE_USER_KEY = "current_user";

export async function getCurrentUser() {
  const userJson = await AsyncStorage.getItem(STORAGE_USER_KEY);
  if (userJson === null) {
    return new User();
  }

  const user = JSON.parse(userJson);
  return Object.assign(new User(), user);
}

export async function saveCurrentUser(user) {
  const userJson = JSON.stringify(user);
  await AsyncStorage.setItem(STORAGE_USER_KEY, userJson);
}
