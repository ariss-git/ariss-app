import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { View, Text, TouchableOpacity } from 'react-native';

const GoBack = () => {
  const router = useRouter();

  return (
    <View className="flex w-full flex-row items-center justify-between p-6">
      <TouchableOpacity className="bg-white p-4">
        <ChevronRight size={20} color={'black'} />
      </TouchableOpacity>
      <View />
    </View>
  );
};

export default GoBack;
