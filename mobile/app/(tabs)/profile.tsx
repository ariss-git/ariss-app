import { Stack } from 'expo-router';
import { View, Text } from 'react-native';
import React from 'react';

const Profile = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Profile' }} />
      <View className="w-full flex-1 items-center justify-center">
        <Text className="text-2xl font-bold">Profile</Text>
      </View>
    </>
  );
};

export default Profile;
