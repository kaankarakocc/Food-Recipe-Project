import { Image, Text, View, Pressable } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function CardItem({ item, pressHandler }) {

    const heights = [hp(25), hp(30), hp(35)];

    let selectedHeight = heights[item.index % 3];

    return (
        <Animated.View
            entering={FadeInDown.duration(500).springify()}
            className="mx-2"
        >
            <Pressable
                className="flex items-center justify-center mb-4 space-y-1"
                onPress={() => pressHandler(item)}
            >
                <Image
                    source={{ uri: item.strMealThumb }}
                    style={{ width: '100%', height: selectedHeight, borderRadius: 25 }}
                />
                <Text numberOfLines={1} className="font-medium" style={{ fontSize: hp(1.7) }}>
                    {item.strMeal}
                </Text>
            </Pressable>
        </Animated.View>
    )
}
