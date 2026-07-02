import FetchAllProductsAccSubcategory from '@/components/custom/FetchAllProductsBySubcategory';
import GoBack from '@/components/custom/GoBack';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

const FetchProductsBySubcategory = () => {
  const { subcategoryId } = useLocalSearchParams<{ subcategoryId: string }>();
  return (
    <View className="w-full flex-1 items-center justify-between px-6 py-10">
      <GoBack />
      <FetchAllProductsAccSubcategory subcategoryId={subcategoryId} />
    </View>
  );
};

export default FetchProductsBySubcategory;
