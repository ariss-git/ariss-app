import { useState } from 'react';
import { View, Text } from 'react-native';

const FetchAllProductsAccSubcategory = () => {
  const [products, setProducts] = useState<[]>();

  const handleFetchAllProducts = async () => {
    try {
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <View>
      <Text>FetchAllProductsBySubcategory</Text>
    </View>
  );
};

export default FetchAllProductsAccSubcategory;
