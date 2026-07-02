import { fetchAllProductsBySubcategoryAPI } from '@/api/product.api';
import type { FetchAllProductsBySubcategoryType } from '@/types/product.type';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, View, Text, Image, Pressable } from 'react-native';

const FetchAllProductsAccSubcategory = ({ subcategoryId }: { subcategoryId: string }) => {
  const [products, setProducts] = useState<FetchAllProductsBySubcategoryType[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetchAllProductsBySubcategoryAPI(subcategoryId);
        setProducts(res.data.products);
      } catch (error: any) {
        console.log(error?.response?.data || error.message);
      }
    };

    fetchProducts();
  }, [subcategoryId]);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 12,
        paddingBottom: 24,
        gap: 12,
      }}
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => ({
            flexDirection: 'row',
            backgroundColor: '#fff',
            borderRadius: 12,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#e5e7eb',
            opacity: pressed ? 0.9 : 1,
          })}
          onPress={() => {
            router.push({
              pathname: '/(stocks)/products/[productId]',
              params: { productId: item.id },
            });
          }}>
          <Image
            source={{
              uri: item.imageUrls[0] || 'https://via.placeholder.com/300',
            }}
            style={{
              width: '40%',
              aspectRatio: 1,
              backgroundColor: '#f3f4f6',
            }}
            resizeMode="contain"
          />

          <View
            style={{
              flex: 1,
              padding: 12,
              gap: 6,
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: '#111827',
              }}>
              {item.name}
            </Text>

            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: '#111827',
              }}>
              ₹{item.price.toLocaleString('en-IN')}
            </Text>

            <Text
              style={{
                fontSize: 12,
                color: item.quantity > 0 ? '#15803d' : '#dc2626',
              }}>
              {item.quantity > 0 ? `${item.quantity} in stock` : 'Out of stock'}
            </Text>

            <Pressable
              style={({ pressed }) => ({
                marginTop: 4,
                alignSelf: 'flex-start',
                paddingHorizontal: 14,
                paddingVertical: 6,
                borderRadius: 8,
                backgroundColor: pressed ? '#1f2937' : '#111827',
              })}
              onPress={() => {
                // router.push(...)
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: '#fff',
                }}>
                View
              </Text>
            </Pressable>
          </View>
        </Pressable>
      )}
      ListEmptyComponent={
        <View
          style={{
            alignItems: 'center',
            marginTop: 60,
          }}>
          <Text style={{ fontSize: 16, color: '#6b7280' }}>No products found.</Text>
        </View>
      }
    />
  );
};

export default FetchAllProductsAccSubcategory;
