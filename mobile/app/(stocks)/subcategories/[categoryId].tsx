import { View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import FetchAllSubcategories from '@/components/custom/FetchAllSubcategories';

const FetchSubcategoryByCategory = () => {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();

  return (
    <View className="w-full flex-1 items-center justify-center px-6 py-20">
      <FetchAllSubcategories categoryId={categoryId} />
    </View>
  );
};

export default FetchSubcategoryByCategory;
