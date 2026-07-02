import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

const FetchProductsBySubcategory = () => {
  const { subcategoryId } = useLocalSearchParams<{ subcategoryId: string }>();
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Subcateogry ID: {subcategoryId}</Text>
    </View>
  );
};

export default FetchProductsBySubcategory;
