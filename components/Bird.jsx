import { View, Image } from "react-native";

const Bird = ({ birdBottom, birdLeft }) => {
  const birdWidth = 100;
  const birdHeight = 100;

  return (
    <View
      style={{
        position: "absolute",
        left: birdLeft - birdWidth / 2,
        bottom: birdBottom - birdHeight / 2,
        width: birdWidth,
        height: birdHeight,
      }}
    >
      <Image
        style={{ width: birdWidth, height: birdHeight }}
        source={require("../images/flappy-bird.png")}
      />
    </View>
  );
};

export default Bird;
