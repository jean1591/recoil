import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, FeaturedCard } from "@/components/Cards";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { router, useLocalSearchParams } from "expo-router";

import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { useAppwrite } from "@/lib/useAppWrite";
import { useEffect } from "react";
import { useGlobalContext } from "@/lib/globalProvider";

export default function Explore() {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => {
    return router.push(`/properties/${id}`);
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        keyExtractor={(item) => item.$id}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        data={properties}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
                Search for your ideal home
              </Text>

              <Image source={icons.bell} className="h-6 w-6" />
            </View>

            <Search />

            <View className="mt-5">
              <Filters />
              <View className="mt-5">
                <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                  Found {properties?.length} properties
                </Text>
              </View>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
