import { Text, View } from 'react-native'
import React from 'react'
import MasonryList from '@react-native-seoul/masonry-list';
import useFetch from '../api/UseFetch';
import CardItem from './CardItem';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function MasonaryList({ activeCategory, pressHandler }) {


    const { data, loading } = useFetch(`filter.php?c=${activeCategory}`, 'meals');

    const data2 = data.map((item, index) => ({ ...item, index }));

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <View className="my-4 border-b-2 border-gray-300/50">
                <Text style={{ fontSize: hp(3.2) }} className="font-medium text-red-500 ml-2 mb-1">
                    Recipes
                </Text>
            </View>
            <MasonryList
                data={data2}
                keyExtractor={(item) => item.idMeal}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <CardItem item={item} pressHandler={pressHandler} />}
                refreshing={loading}
                onEndReachedThreshold={0.1}
            />
        </View>
    )
}
