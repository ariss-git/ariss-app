import FetchAllCategories from '@/components/custom/FetchAllCategories';
import Subcategories from '@/components/custom/FetchAllSubcategories';
import Navbar from '@/components/custom/Navbar';
import { Link, Stack } from 'expo-router';

import { ScrollView, Text, View } from 'react-native';

const Home = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Navbar />
      <ScrollView contentContainerClassName="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="flex w-full items-center justify-center">
          <FetchAllCategories />
          <Subcategories />
        </View>
      </ScrollView>
    </>
  );
};

export default Home;
