import FetchSingleProduct from '@/components/custom/FetchSingleProduct';
import GoBack from '@/components/custom/GoBack';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

const Product = () => {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  return (
    <View className="w-full flex-1 items-center justify-between px-6 py-10">
      <GoBack />
      <FetchSingleProduct productId={productId} />
      <View className="flex w-full items-center justify-center">
        <TouchableOpacity
          className="w-full rounded-lg bg-orange-500 py-5"
          style={{
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)',
          }}>
          <Text className="text-center text-lg font-medium">Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Product;
