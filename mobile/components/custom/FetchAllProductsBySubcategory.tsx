import { fetchAllProductsBySubcategoryAPI } from '@/api/product.api';
import type { FetchAllProductsBySubcategoryType } from '@/types/product.type';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const FetchAllProductsAccSubcategory = () => {
  const [products, setProducts] = useState<FetchAllProductsBySubcategoryType[]>();
  let subcategoryId = 'b5a6a670-97f2-4d51-9708-66dcf5cf96a0';

  const handleFetchAllProducts = async () => {
    try {
      await fetchAllProductsBySubcategoryAPI(subcategoryId)
        .then((res) => {
          console.log(res.data.products);
          setProducts(res.data.products);
        })
        .catch((err) => {
          console.error(err.data.response.error);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleFetchAllProducts();
  }, [subcategoryId]);

  return (
    <View>
      <Text>{JSON.stringify(products)}</Text>
    </View>
  );
};

export default FetchAllProductsAccSubcategory;
