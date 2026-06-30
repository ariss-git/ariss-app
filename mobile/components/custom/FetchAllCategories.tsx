import { fetchAllCategoriesAPI } from '@/api/category.api';
import type { FetchAllCategoriesType } from '@/types/category.type';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

const FetchAllCategories = () => {
  const [categories, setCategories] = useState<FetchAllCategoriesType[]>([]);

  const handleFetchAllCategories = async () => {
    try {
      await fetchAllCategoriesAPI()
        .then((res) => {
          console.log(res.data.category);
          setCategories(res.data.category);
        })
        .catch((err) => {
          console.error(err.data.response.error);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleFetchAllCategories();
  }, []);

  return (
    <View className="w-full p-6">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}>
        {categories.map((category) => (
          <View key={category.id} className="w-20 items-center justify-start gap-y-2">
            <Image
              source={{ uri: category.imageUrl }}
              className="h-20 w-20 rounded-full bg-gray-200"
              resizeMode="cover"
            />
            <Text numberOfLines={1} className="text-center text-xs text-gray-800">
              {category.name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FetchAllCategories;
