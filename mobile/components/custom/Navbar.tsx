import { View, Text, TextInput } from 'react-native';
import { Search, MapPin, ChevronDown } from 'lucide-react-native';

const Navbar = () => {
  return (
    <View className="bg-orange-500 px-4 pb-3 pt-14">
      {/* Search Bar */}
      <View className="relative w-full">
        <Search
          size={20}
          color="#777676"
          style={{
            position: 'absolute',
            left: 14,
            top: 14,
            zIndex: 1,
          }}
        />

        <TextInput
          placeholder="Search for Products..."
          placeholderTextColor="#777676"
          className="w-full rounded-lg bg-white py-3 pl-11 pr-4 text-base"
        />
      </View>

      {/* Address */}
      <View className="mt-3 flex-row items-center">
        <MapPin size={18} color="black" />

        <Text numberOfLines={1} className="mx-2 flex-1 text-sm font-medium text-black">
          Deliver to Unity Palace, Flat No. 503, Wing-B, Kengeri Hobli...
        </Text>

        <ChevronDown size={18} color="black" />
      </View>
    </View>
  );
};

export default Navbar;
