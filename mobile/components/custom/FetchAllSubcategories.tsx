import { fetchAllSubcategoriesByCategory } from '@/api/subcategory.api';
import type { FetchSubcategoriesByCategoryType } from '@/types/subcategory.api';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const Subcategories = () => {
  const [subcategories, setSubcategories] = useState<FetchSubcategoriesByCategoryType[]>([]);
  let categoryId = '23b39aad-abaf-4f5e-98e7-7268d2ef003c';

  const handleFetchSubcategory = async () => {
    try {
      await fetchAllSubcategoriesByCategory(categoryId!)
        .then((res) => {
          console.log(res.data.subcategory);
          setSubcategories(res.data.subcategory);
        })
        .catch((err) => {
          console.log(err.data.response.error);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleFetchSubcategory();
  }, []);

  return (
    <View className="flex w-full items-center justify-center px-6 py-10">
      <Text>{JSON.stringify(subcategories)}</Text>
    </View>
  );
};

export default Subcategories;
