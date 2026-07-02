import { fetchAllSubcategoriesByCategory } from '@/api/subcategory.api';
import type { FetchSubcategoriesByCategoryType } from '@/types/subcategory.api';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, View, Text, Image, Pressable } from 'react-native';

const FetchAllSubcategories = ({ categoryId }: { categoryId: string }) => {
  const [subcategories, setSubcategories] = useState<FetchSubcategoriesByCategoryType[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchAllSubcategoriesByCategory(categoryId);
        setSubcategories(res.data.subcategory);
      } catch (error: any) {
        console.log(error?.response?.data || error.message);
      }
    };

    fetchData();
  }, [categoryId]);

  return (
    <FlatList
      data={subcategories}
      keyExtractor={(item) => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 24,
      }}
      columnWrapperStyle={{
        justifyContent: 'space-between',
        marginBottom: 16,
      }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            router.push({
              pathname: '/(stocks)/products/[subcategoryId]',
              params: { subcategoryId: item.id },
            });
          }}
          style={{
            width: '48.5%',
            backgroundColor: '#fff',
            borderRadius: 18,
            overflow: 'hidden',
            elevation: 4,
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 8,
            shadowOffset: {
              width: 0,
              height: 3,
            },
          }}>
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: '100%',
              height: 140,
            }}
            resizeMode="cover"
          />

          <View
            style={{
              paddingHorizontal: 12,
              paddingVertical: 14,
            }}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 15,
                fontWeight: '600',
                textAlign: 'center',
                color: '#222',
              }}>
              {item.name}
            </Text>
          </View>
        </Pressable>
      )}
    />
  );
};

export default FetchAllSubcategories;
