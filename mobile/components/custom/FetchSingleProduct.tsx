import { FetchSingleProductType } from '@/types/product.type';
import { useState } from 'react';
import { View, Text } from 'react-native';
import GoBack from './GoBack';

const FetchSingleProduct = () => {
  const [product, setProduct] = useState<FetchSingleProductType | null>(null);

  return (
    <View className="flex w-full items-center justify-between px-6 py-10">
      <Text>FetchSingleProduct</Text>
    </View>
  );
};

export default FetchSingleProduct;
