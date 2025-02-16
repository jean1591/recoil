import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { FeaturedCard } from "@/components/Cards";
import { SafeAreaView } from "react-native-safe-area-context";
import { getLatestProperties } from "@/lib/appwrite";
import { router } from "expo-router";
import { useAppwrite } from "@/lib/useAppWrite";
import { useGlobalContext } from "@/lib/globalProvider";

export default function Index() {
  const { user } = useGlobalContext();

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  const handleCardPress = (id: string) => {
    return router.push(`/properties/${id}`);
  };

  return (
    <SafeAreaView className="bg-white h-full px-5">
      <View className="">
        <View className="bg-primary-100 mt-5 rounded-xl p-5">
          <View className="flex flex-row">
            <Image
              source={{ uri: user?.avatar }}
              className="size-12 rounded-full"
            />
            <View className="flex flex-col items-start ml-2 justify-center">
              <Text className="text-xs font-rubik text-black-100">
                Good morning !
              </Text>
              <Text className="text-base font-rubik-medium text-black-300">
                {user?.name}
              </Text>
            </View>
          </View>

          <View className="mt-5 flex flex-row gap-5">
            <TouchableOpacity className="flex-1 flex items-center justify-center p-2 bg-primary-300 rounded-full">
              <Text className="font-rubik-bold text-lg text-white">
                Add session
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex items-center justify-center p-2 bg-primary-300 rounded-full">
              <Text className="font-rubik-bold text-lg text-white">
                See profiles
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="flex flex-row items-center justify-between mt-5">
        <Text className="text-xl font-rubik-bold text-black-300">
          Last sessions
        </Text>
        <TouchableOpacity>
          <Text className="text-base font-rubik-bold text-primary-300">
            See all
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={latestProperties}
        renderItem={({ item }) => (
          <FeaturedCard item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="flex gap-5 mt-5"
      />

      <View className="mb-24 flex flex-row justify-end gap-5">
        <TouchableOpacity className="w-1/2 flex items-center justify-center p-2 bg-primary-300 rounded-full">
          <Text className="font-rubik-bold text-lg text-white">
            Add session
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
