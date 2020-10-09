import React from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressCircle from "react-native-progress-circle";

const achievements = [
  {
    id: "1",
    secret: false,
    title: "Good start 👏",
    description: "Collect 10 bags of trash",
    icon: require("../../assets/trash.png")
  },
  {
    id: "2",
    secret: false,
    title: "Keep going",
    description: "Collect 20 bags of trash",
    icon: require("../../assets/idleGif.gif")
  },
  {
    id: "3",
    secret: true,
    title: "Recycler",
    description: "Read about recycling in main menu",
    icon: require("../../assets/leaflogo_1.png")
  },
  {
    id: "8",
    secret: false,
    title: "Trash master",
    description: "Collect 5000000 bags of trash 😋",
    icon: require("../../assets/idleGif.gif")
  },
  {
    id: "5",
    secret: false,
    title: "Keep going",
    description: "Collect 20 bags of trash",
    icon: require("../../assets/leaflogo_1.png")
  },
  {
    id: "7",
    secret: true,
    title: "S.E.C.R.E.T.",
    description: "Collect 10 bags of trash",
    icon: require("../../assets/trash.png")
  },
  {
    id: "4",
    secret: false,
    title: "Good start",
    description: "Collect 10 bags of trash",
    icon: require("../../assets/trash.png")
  },
];

export default function Achievements({ navigaton }) {
  // TODO: Figure out how to get user's collection status here
  const collectedAchievements = [
    "1", "2", "7"
  ];

  const displayedAchivements = achievements.map(achievement => {
    return {
      ...achievement,
      collected: collectedAchievements.includes(achievement.id)
    };
  });

  return (
    <View style={styles.screenContainer}>
      <Header numCollected={collectedAchievements.length} totalAvailable={achievements.length} />
      <FlatList
        data={displayedAchivements}
        keyExtractor={a => a.id}
        renderItem={({ item }) => <AchievementRow title={item.title} description={item.description} icon={item.icon} secret={item.secret} collected={item.collected} />}
        style={{ overflow: "visible" }}
      />
    </View>
  );
}

const Header = ({ numCollected, totalAvailable }) => (
  <View style={styles.headerContainer}>
    <SafeAreaView>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Achievements</Text>

      </View>
    </SafeAreaView>
  </View>
);

const AchievementRow = ({ title, description, icon, secret, collected }) => (
  <View style={styles.achievementRow}>
    <View style={[styles.achievementIconContainer, !collected && styles.achievementIconContainerNotCollected]}>
      {!collected && secret ? (
        <Icon name="question" size={40} color="white" style={styles.achievementIconSecret} />
      ) : (
          <Image source={icon} style={[styles.achievementIcon, !collected && styles.achievementIconNotCollected]} />
        )}
    </View>
    <View style={styles.achievementInfoContainer}>
      <Text style={[styles.achievementTitle, !collected && styles.achievementTitleNotCollected]}>{title}</Text>
      <Text style={[styles.achievementDescription, !collected && styles.achievementDescriptionNotCollected]}>{!collected && secret ? "???" : description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#8EE1FF"
  },
  headerContainer: {
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#31A896",
    zIndex: 10,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    // Android shadow
    elevation: 4,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  headerCounter: {
    color: "white",
    fontSize: 15,
  },
  achievementRow: {
    flexDirection: "row",
    flexShrink: 1,
    marginVertical: 3,
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 20,
    backgroundColor: "#31A896",
    borderRadius: 40,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    // Android shadow
    elevation: 4,
  },
  achievementIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 1000,
    backgroundColor: "rgba(0,0,0,0.25)",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "white"
  },
  achievementIcon: {
    width: "100%",
    height: "100%",
  },
  achievementIconSecret: {
    color: "rgba(0,0,0,0.3)"
  },
  achievementInfoContainer: {
    flex: 1,
    alignSelf: "center",
    marginLeft: 10,
    color: "black"
  },
  achievementTitle: {
    fontSize: 20,
    color: "white"
  },
  achievementDescription: {
    color: "rgba(0,0,0,0.9)"
  },
  achievementIconContainerNotCollected: {
    borderWidth: 0,
  },
  achievementIconNotCollected: {
    opacity: 0.3
  },
  achievementTitleNotCollected: {
    color: "rgba(0,0,0,0.5)"
  },
  achievementDescriptionNotCollected: {
    color: "rgba(0,0,0,0.5)"
  },
});
