import { fetchSingleProductAPI } from '@/api/product.api';
import { FetchSingleProductType } from '@/types/product.type';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width - 32;
const IMAGE_HEIGHT = 240;

const FetchSingleProduct = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState<FetchSingleProductType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchProduct = async () => {
    setLoading(true);
    try {
      const res = await fetchSingleProductAPI(productId);
      setProduct(res.data.product);
    } catch (error: any) {
      console.error(error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchProduct();
  }, [productId]);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / IMAGE_WIDTH);
    setActiveIndex(index);
  };

  if (loading) {
    return (
      <View className="w-full flex-1 items-center justify-center">
        <ActivityIndicator size={24} color={'darkorange'} />
      </View>
    );
  }

  return (
    <View className="my-8 flex-1">
      {product?.imageUrls && product.imageUrls.length > 0 && (
        <>
          <FlatList
            data={product.imageUrls}
            horizontal
            pagingEnabled
            decelerationRate="fast"
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            onMomentumScrollEnd={handleScrollEnd}
            renderItem={({ item }) => (
              <View
                style={{
                  width: IMAGE_WIDTH,
                  paddingHorizontal: 16,
                }}>
                <Image
                  source={{ uri: item }}
                  style={{
                    width: '100%',
                    height: IMAGE_HEIGHT,
                    borderRadius: 14,
                  }}
                  resizeMode="cover"
                />
              </View>
            )}
          />

          <View className="mt-4 flex-row justify-center">
            {product.imageUrls.map((_, index) => (
              <View
                key={index}
                style={{
                  width: activeIndex === index ? 18 : 8,
                  height: 8,
                  borderRadius: 999,
                  marginHorizontal: 4,
                  backgroundColor: activeIndex === index ? '#111827' : '#D1D5DB',
                }}
              />
            ))}
          </View>
        </>
      )}

      <View className="px-4 pt-6">
        <Text className="text-2xl font-bold">{product?.name}</Text>

        <Text className="mt-2 text-gray-600">{product?.description}</Text>

        <Text className="mt-5 text-2xl font-bold text-black">₹{product?.price}</Text>

        <View className="my-2 flex w-full flex-row items-center justify-between">
          <Text>{product?.quantity && 'In stock'}</Text>
          <Text>{product?.warranty} years</Text>
        </View>
      </View>
    </View>
  );
};

export default FetchSingleProduct;
