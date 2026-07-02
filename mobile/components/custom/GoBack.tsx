import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { View, TouchableOpacity } from 'react-native';

const GoBack = () => {
  const router = useRouter();

  return (
    <View className="flex w-full flex-row items-center justify-between">
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
        className="mt-4 bg-orange-500 p-4"
        style={{
          borderRadius: '100%',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)',
        }}>
        <ChevronLeft size={24} color={'black'} />
      </TouchableOpacity>
      <View />
    </View>
  );
};

export default GoBack;
