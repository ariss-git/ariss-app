import FetchAllProductsAccSubcategory from '@/components/custom/FetchAllProductsBySubcategory';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

const FetchProductsBySubcategory = () => {
  const { subcategoryId } = useLocalSearchParams<{ subcategoryId: string }>();
  return (
    <View className="flex-1 items-center justify-center px-6 py-10">
      <FetchAllProductsAccSubcategory subcategoryId={subcategoryId} />
    </View>
  );
};

export default FetchProductsBySubcategory;
