import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

const Product = () => {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Product ID: {productId}</Text>
    </View>
  );
};

export default Product;
