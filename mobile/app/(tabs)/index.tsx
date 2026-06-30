import Navbar from '@/components/custom/Navbar';
import { Stack } from 'expo-router';

import { ScrollView, Text, View } from 'react-native';

const Home = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Navbar />
      <ScrollView contentContainerClassName="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="w-full flex-1 items-center justify-center">
          <Text className="text-2xl font-bold">ARISS</Text>
        </View>
      </ScrollView>
    </>
  );
};

export default Home;
