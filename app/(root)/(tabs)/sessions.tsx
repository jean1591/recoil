import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/Search";
import { getProperties } from "@/lib/appwrite";
import icons from "@/constants/icons";
import { useAppwrite } from "@/lib/useAppWrite";
import { useEffect } from "react";

export default function Sessions() {
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
    <SafeAreaView className="bg-white h-full px-5">
      <FlatList
        keyExtractor={(item) => item.$id}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        contentContainerClassName="pb-32"
        showsVerticalScrollIndicator={false}
        data={properties}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        ListHeaderComponent={
          <View className="mt-5">
            <Text className="text-3xl font-rubik-extrabold text-black-300">
              Activity
            </Text>
            <Text className="text-xl font-rubik-bold text-black-300 mt-5">
              Found {properties?.length} sessions
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
