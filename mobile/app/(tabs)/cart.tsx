import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
const Cart = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Cart' }} />
      <View className="w-full flex-1 items-center justify-center">
        <Text className="text-2xl font-bold">Cart</Text>
      </View>
    </>
  );
};

export default Cart;
