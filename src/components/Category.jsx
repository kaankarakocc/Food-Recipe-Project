import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import useFetch from '../api/UseFetch';

export default function Category({ activeCategory, setActiveCategory }) {

    const { data } = useFetch('categories.php', 'categories');
    
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            {data && data.map((category) => (
                <Animated.View
                    className="flex-column items-center justify-center mx-2"
                    key={category.idCategory}
                    entering={FadeInDown.duration(500).springify()}
                >
                    <TouchableOpacity className="rounded-full items-center justify-center bg-gray-100 p-1.5"
                        style={activeCategory == category.strCategory ? [{ backgroundColor: '#fc8181' }] : null}
                        onPress={() => setActiveCategory(category.strCategory)}
                    >
                        <Image
                            source={{ uri: category.strCategoryThumb }}
                            style={{ width: hp(7), height: hp(7) }}
                            className="rounded-full"
                            resizeMode='cover'
                        />
                    </TouchableOpacity>
                    <Text className="mt-1">
                        {category.strCategory}
                    </Text>
                </Animated.View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({})