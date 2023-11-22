import { Image, Pressable, Text, View } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Category from '../components/Category'
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import SearchBar from '../components/SearchBar'
import MasonaryList from '../components/MasonaryList';

export default function HomeScreen({ navigation }) {

    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("Beef");

    const pressHandler = (item) => {
        navigation.navigate('FoodRecipe', { ...item });
    }

    return (
        <View className="flex-1 bg-amber-50">
            <StatusBar style='dark' />

            {/* Avatar - Bell Icon */}
            <View className="mt-12 py-2 px-4 flex-row items-center justify-between ">
                <Pressable
                    style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                >
                    <Image
                        source={require('../../assets/images/avatar.png')}
                        style={{ width: hp(5), height: hp(5) }}
                    />
                </Pressable>
                <Pressable
                    style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                >
                    <BellIcon color="gray" size={hp(4)} />
                </Pressable>
            </View>

            {/* Welcome Text */}
            <View className="py-2 px-4 space-y-3">
                <Text style={{ fontSize: hp(2) }} className="font-medium">Welcome Taste Buddy..!</Text>
                <Text style={{ fontSize: hp(3.3) }} className="font-bold">What you want to <Text className="text-red-500">cook</Text> today ?</Text>
            </View>

            {/* Search Bar */}
            <View className="my-2 mx-4 flex-row items-center rounded-full bg-black/5 p-[6px] justify-between">
                <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
                <Pressable
                    className="rounded-full items-center justify-center bg-white"
                    style={{ width: hp(5), height: hp(5) }}
                    onPress={() => handleSearchPress()}
                >
                    <MagnifyingGlassIcon color="gray" size={hp(3.5)} />
                </Pressable>
            </View>

            {/* Category List */}
            <View className="py-2 px-4">
                <Category setActiveCategory={setActiveCategory} activeCategory={activeCategory} />
            </View>

            {/* Masonary Meal Data */}
            <View className="flex-1 py-2 px-4 space-y-2">
                <MasonaryList activeCategory={activeCategory} pressHandler={pressHandler} />
            </View>
        </View>
    )
}
