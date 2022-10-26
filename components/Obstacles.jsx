import { View, Image } from "react-native";

const Obstacles = ({
  obstaclesLeft,
  obstacleWidth,
  obstacleHeight,
  gap,
  randomBottom,
}) => {
  return (
    <>
      <View
        style={{
          position: "absolute",
          left: obstaclesLeft,
          bottom: randomBottom + obstacleHeight + gap,
        }}
      >
        <Image
          style={{
            width: obstacleWidth,
            height: obstacleHeight,
            transform: [{ rotate: "180deg" }],
          }}
          source={require("../images/obstacle.png")}
        />
      </View>
      <View
        style={{
          position: "absolute",
          width: obstacleWidth,
          height: obstacleHeight,
          left: obstaclesLeft,
          bottom: randomBottom,
        }}
      >
        <Image
          style={{ width: obstacleWidth, height: obstacleHeight }}
          source={require("../images/obstacle.png")}
        />
      </View>
    </>
  );
};

export default Obstacles;
