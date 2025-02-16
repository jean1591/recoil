import { Image, Text, TouchableOpacity, View } from "react-native";

import { Models } from "react-native-appwrite";
import icons from "@/constants/icons";
import images from "@/constants/images";

interface Props {
  item: Models.Document;
  onPress?: () => void;
}

export const FeaturedCard = ({
  item: { image, rating, name, address, price },
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start w-60 h-80 relative"
    >
      <Image source={{ uri: image }} className="size-full rounded-2xl" />

      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />

      <View className="flex flex-row items-center px-3 py-1.5 rounded-full absolute top-5 right-5">
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-1">
          {rating}
        </Text>
      </View>

      <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
        <Text
          className="text-xl font-rubik-extrabold text-white"
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text className="text-base font-rubik text-white">{address}</Text>

        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-xl font-rubik-extrabold text-white">
            ${price}
          </Text>
          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ item: { image }, onPress }: Props) => {
  return (
    <TouchableOpacity
      className="flex-1 w-full mt-4 px-3 py-4 rounded-xl bg-primary-100 flex flex-row items-center justify-start gap-5"
      onPress={onPress}
    >
      <Image source={{ uri: image }} className="size-32 rounded-lg" />

      <View className="mt-2">
        <Text className="text-xl font-rubik-bold text-black-300">
          Savage BF 22 LR
        </Text>

        <View className="text-base flex flex-row items-center justify-between">
          <Text className="font-rubik text-black-100">2024-10-14</Text>
          <Text className="font-rubik text-black-300">100m</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
