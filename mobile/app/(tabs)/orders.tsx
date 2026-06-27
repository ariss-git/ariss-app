import { Stack } from 'expo-router';
import { View, Text } from 'react-native';
import React from 'react';

const Orders = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Orders' }} />
      <View className="w-full flex-1 items-center justify-center">
        <Text className="text-2xl font-bold">Orders</Text>
      </View>
    </>
  );
};

export default Orders;
