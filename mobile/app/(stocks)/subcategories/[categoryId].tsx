import { View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import FetchAllSubcategories from '@/components/custom/FetchAllSubcategories';
import GoBack from '@/components/custom/GoBack';

const FetchSubcategoryByCategory = () => {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();

  return (
    <View className="w-full flex-1 items-center justify-between px-6 py-10">
      <GoBack />
      <FetchAllSubcategories categoryId={categoryId} />
    </View>
  );
};

export default FetchSubcategoryByCategory;
