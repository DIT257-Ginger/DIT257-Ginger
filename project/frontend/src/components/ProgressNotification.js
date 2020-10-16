import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Modal,
  Text,
  TouchableHighlight,
  View,
  Image,
  Platform,
} from "react-native";
import {
  allAchievements,
  AchievementGainedSignaler,
} from "../features/achievements";
import { LevelGainedSignaler } from "../features/leveling";
import UserLevel from "./UserLevel";
import { shareText } from "../features/sharing";

function ProgressNotificationContent({ onClosed, type, value }) {
  let content = null;
  let share = null;
  if (type === "achievement") {
    let gainedAchievement = null;
    allAchievements.forEach((achievement) => {
      if (achievement.id == value) gainedAchievement = achievement;
    });
    content = (
      <View style={styles.progressContainer}>
        <View style={styles.progressTitleContainer}>
          <Text style={styles.progressTitle}>Achievement Unlocked!</Text>
          <Text>{gainedAchievement.title}</Text>
          <View style={styles.achievementIconContainer}>
            <Image
              source={gainedAchievement.icon}
              style={styles.achievementIcon}
            />
          </View>
        </View>
      </View>
    );
    share = async () => {
      await shareText(
        `I just gained the ${gainedAchievement.title} achievement in Pick It!`
      );
    };
  } else if (type === "level") {
    content = (
      <View style={styles.progressContainer}>
        <View style={styles.progressTitleContainer}>
          <Text style={styles.progressTitle}>Level Up!</Text>
          <UserLevel />
          <Text>Congratulations you have gained another level</Text>
        </View>
      </View>
    );
    share = async () => {
      await shareText(`I just achieved level ${value} in Pick It!`);
    };
  }
  return (
    <View style={styles.modalBackground}>
      <View style={styles.modalBox}>
        {content}
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.closeBtn}
            onPress={() => {
              if (onClosed) {
                onClosed();
              }
            }}
            testID={"close-btn"}
          >
            <Text style={styles.closeBtnText}>Close</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.shareBtn}
            testID={"share-btn"}
            onPress={share}
          >
            <Text style={styles.shareBtnText}>Share</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

export default function ProgressNotification() {
  const [modalVisible, setModalVisible] = useState(false);
  const [progressType, setProgressType] = useState(null);
  const [progressValue, setProgressValue] = useState(null);

  function showProgressNotification(type, value) {
    setProgressType(type);
    setProgressValue(value);
    setModalVisible(true);
  }

  useEffect(() => {
    const signalAchievement = (id) =>
      showProgressNotification("achievement", id);
    const signalLevel = (level) => showProgressNotification("level", level);

    AchievementGainedSignaler.subscribe(signalAchievement);
    LevelGainedSignaler.subscribe(signalLevel);
    return () => {
      AchievementGainedSignaler.unSubscribe(signalAchievement);
      LevelGainedSignaler.unSubscribe(signalLevel);
    };
  }, []);

  return (
    <>
      {Platform.OS !== "web" || modalVisible ? (
        //Collect Popup Window
        <Modal
          style={styles.modalContainer}
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          testID={"collect-modal"}
        >
          <ProgressNotificationContent
            onClosed={() => setModalVisible(false)}
            type={progressType}
            value={progressValue}
          />
        </Modal>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  achievementIcon: {
    aspectRatio: 1,
    flex: 1,
    resizeMode: "contain",
  },
  achievementIconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "10%",
    marginRight: "10%",
  },
  progressTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  progressTitle: {
    fontSize: 25,
    paddingBottom: 20,
  },
  modalContainer: {
    width: "100%",
    height: "100%",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: "80%",
    height: "40%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "white",
    borderRadius: 20,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Android shadow
    elevation: 5,
  },
  progressContainer: {
    flex: 1,
  },
  trashCountInput: {
    flexBasis: 120,
    flexGrow: 1,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  closeBtn: {
    flex: 1,
    marginRight: 15,
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 20,
    elevation: 2,
  },
  closeBtnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  shareBtn: {
    flex: 1,
    marginLeft: 15,
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 20,
    elevation: 2,
  },
  shareBtnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
