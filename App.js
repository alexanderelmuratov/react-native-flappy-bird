import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import Bird from "./components/Bird";
import Obstacles from "./components/Obstacles";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

export default function App() {
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(
    screenWidth + screenWidth / 1.8
  );
  const [obstaclesNegHeight, setobstaclesNegHeight] = useState(0);
  const [obstaclesNegHeightTwo, setobstaclesNegHeightTwo] = useState(
    -Math.random() * 100
  );
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Bird
  const birdLeft = screenWidth / 2;
  const gravity = 3;
  // Obstacles
  const obstacleWidth = 80;
  const obstacleHeight = 500;
  const gap = 200;
  // Sounds
  const jumpSound = require("./assets/sounds/jump.wav");
  // Timers
  let birdBottomTimerId;
  let obstaclesLeftTimerId;
  let obstaclesLeftTimerIdTwo;

  // Start bird falling
  useEffect(() => {
    if (birdBottom > 0) {
      birdBottomTimerId = setInterval(() => {
        setBirdBottom((birdBottom) => birdBottom - gravity);
      }, 30);
      return () => clearInterval(birdBottomTimerId);
    }
  }, [birdBottom]);

  // Start bird jumping
  const jump = () => {
    if (!isGameOver && birdBottom < screenHeight) {
      setBirdBottom((birdBottom) => birdBottom + 50);
      playSound(jumpSound);
      console.log("Jump!!!");
    }
  };

  // Start first obstacles
  useEffect(() => {
    if (obstaclesLeft > -obstacleWidth) {
      obstaclesLeftTimerId = setInterval(() => {
        setObstaclesLeft((obstaclesLeft) => obstaclesLeft - 5);
      }, 30);
      return () => clearInterval(obstaclesLeftTimerId);
    } else {
      setObstaclesLeft(screenWidth);
      setobstaclesNegHeight(-Math.random() * 200);
      setScore((score) => score + 1);
    }
  }, [obstaclesLeft]);

  // Start second obstacles
  useEffect(() => {
    if (obstaclesLeftTwo > -obstacleWidth) {
      obstaclesLeftTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo((obstaclesLeftTwo) => obstaclesLeftTwo - 5);
      }, 30);
      return () => clearInterval(obstaclesLeftTimerIdTwo);
    } else {
      setObstaclesLeftTwo(screenWidth);
      setobstaclesNegHeightTwo(-Math.random() * 200);
      setScore((score) => score + 1);
    }
  }, [obstaclesLeftTwo]);

  // Check for collisions
  useEffect(() => {
    if (
      ((birdBottom < obstaclesNegHeight + obstacleHeight + 25 ||
        birdBottom > obstaclesNegHeight + obstacleHeight + gap - 25) &&
        obstaclesLeft > screenWidth / 2 - 25 &&
        obstaclesLeft < screenWidth / 2 + 25) ||
      ((birdBottom < obstaclesNegHeightTwo + obstacleHeight + 25 ||
        birdBottom > obstaclesNegHeightTwo + obstacleHeight + gap - 25) &&
        obstaclesLeftTwo > screenWidth / 2 - 25 &&
        obstaclesLeftTwo < screenWidth / 2 + 25)
    ) {
      console.log("Game over!!!");
      gameOver();
    }
  });

  const gameOver = () => {
    clearInterval(birdBottomTimerId);
    clearInterval(obstaclesLeftTimerId);
    clearInterval(obstaclesLeftTimerIdTwo);
    setIsGameOver(true);
  };

  const gameStart = () => {
    setIsGameOver(false);
    setScore(0);
    setBirdBottom(screenHeight / 2);
    setObstaclesLeft(screenWidth);
    setObstaclesLeftTwo(screenWidth + screenWidth / 1.8);
  };

  const playSound = async (currentSound) => {
    const { sound } = await Audio.Sound.createAsync(currentSound);
    await sound.playAsync();
  };

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <ImageBackground
          style={{ flex: 1, resizeMode: "cover" }}
          source={require("./images/flappy-bird-background.png")}
        >
          {isGameOver && (
            <View style={styles.scoreWrapper}>
              <Text style={styles.scoreText}>{score}</Text>
              <TouchableOpacity style={styles.startButton} onPress={gameStart}>
                <Text style={styles.startButtonText}>Start game</Text>
              </TouchableOpacity>
            </View>
          )}
          <Bird birdBottom={birdBottom} birdLeft={birdLeft} />
          <Obstacles
            obstaclesLeft={obstaclesLeft}
            obstacleWidth={obstacleWidth}
            obstacleHeight={obstacleHeight}
            gap={gap}
            randomBottom={obstaclesNegHeight}
          />
          <Obstacles
            obstaclesLeft={obstaclesLeftTwo}
            obstacleWidth={obstacleWidth}
            obstacleHeight={obstacleHeight}
            gap={gap}
            randomBottom={obstaclesNegHeightTwo}
          />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scoreWrapper: {
    position: "absolute",
    zIndex: 10,
    width: 140,
    left: screenWidth / 2 - 70,
    bottom: screenHeight / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreText: {
    fontWeight: "bold",
    fontSize: 56,
  },
  startButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 140,
    height: 30,
    marginTop: 10,
    backgroundColor: "gold",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
  },
  startButtonText: {
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "uppercase",
  },
});
