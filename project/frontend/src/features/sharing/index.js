import { Share } from "react-native";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

/**
 * Prompts user to share an image from the provided URL.
 * @param {string} url - the URL of the image to be shared
 * @param {string} title - the title of the sharing prompt
 */
export async function shareImage(url, title = "") {
  if (!(await Sharing.isAvailableAsync())) {
    alert("Uh oh, sharing isn't available on your platform");
    return;
  }

  const fileUri = FileSystem.cacheDirectory + "Image.png";
  await FileSystem.downloadAsync(url, fileUri);

  const options = {
    dialogTitle: title,
    mimeType: "image/png",
    UTI: "image/png",
  };

  await Sharing.shareAsync(fileUri, options);
}

/**
 * Prompts user to share a message.
 * @param {string} message - the message to be shared
 */
export async function shareText(message) {
  await Share.share({
    message: message,
  });
}
