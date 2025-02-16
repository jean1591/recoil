import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { router } from "expo-router";

const FirearmProfiles = () => {
  return (
    <SafeAreaView className="bg-white h-full px-5">
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7]}
        renderItem={({ item }) => <FireArmProfileCard />}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex gap-5 mt-5 pb-20"
        ListHeaderComponent={<FirearmProfilesHeader />}
      />
    </SafeAreaView>
  );
};

const FirearmProfilesHeader = () => {
  return (
    <View className="flex flex-row items-center justify-start gap-5">
      <TouchableOpacity
        onPress={() => router.back()}
        className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
      >
        <Image source={icons.backArrow} className="size-5" />
      </TouchableOpacity>

      <Text className="text-xl text-center font-rubik-bold text-black-300">
        Firearm profiles
      </Text>
    </View>
  );
};

const FireArmProfileCard = () => {
  return (
    <TouchableOpacity className="rounded-xl bg-primary-100">
      <Image source={images.japan} className="w-full h-40 rounded-t-lg" />

      <View className="p-5">
        <Text className="font-rubik-bold text-xl text-black-300 text-left">
          Savage BF 22 LR
        </Text>
        <Text className="text-black-200 text-base">
          Savage BF 22LR, optic leica smart shot 3X957, rds quiet hunt 12B
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FirearmProfiles;
