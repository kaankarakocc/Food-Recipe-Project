import { Image, Text, View, ScrollView, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import useFetch from '../api/UseFetch';
import { useNavigation } from '@react-navigation/native';
import { ArrowLongLeftIcon } from "react-native-heroicons/outline";
import YouTubeIframe from 'react-native-youtube-iframe';
import Animated, { FadeInDown, SlideInRight } from 'react-native-reanimated';

const tabList = ['Ingredients', 'Measurements', 'Recipe-Video'];

export default function FoodRecipe({ route }) {
    const item = route.params;
    const { data, loading, error } = useFetch(`lookup.php?i=${item.idMeal}`, 'meals');
    const [ingredients, setIngredients] = useState([]);
    const [measurement, setMeasurement] = useState([]);
    const [activeTab, setActiveTab] = useState("Ingredients");
    const navigation = useNavigation();

    useEffect(() => {
        if (data) {
            const fetchedIngredients = getIngredients().ingredients;
            const fetchedMeasurement = getIngredients().measurements;
            setIngredients(fetchedIngredients);
            setMeasurement(fetchedMeasurement);
        }
    }, [data]);

    const handleBackButton = () => {
        navigation.goBack();
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            header: () => (
                <View style={{ height: 90, backgroundColor: 'rgb(239, 68, 68)' }}>
                    <Pressable onPress={handleBackButton} style={styles.header}>
                        <ArrowLongLeftIcon color='white' size={hp(5)} />
                    </Pressable>
                </View>
            )
        });
    }, [navigation])

    const getIngredients = () => {
        const ingredients = [];
        const measurements = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = data[0] && Array.isArray(data) ? data[0][`strIngredient${i}`] : null;
            const measurement = data[0] && Array.isArray(data) ? data[0][`strMeasure${i}`] : null
            if (ingredient && ingredient.trim() !== '') {
                ingredients.push(`${ingredient}`);
            }
            if (measurement && measurement.trim() !== '') {
                measurements.push(`${measurement}`);
            }
        }
        return { ingredients, measurements };
    };

    const getYoutubeVideoId = url => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    }

    const switcher = () => {
        switch (activeTab) {
            case 'Ingredients':
                return (
                    <Animated.View
                        entering={FadeInDown.duration(500).springify().damping(10)}
                        style={{ width: '100%', height: '100%' }}
                        className="flex-1 items-center justify-center rounded-lg p-2"
                    >
                        <Text className="font-medium text-center" style={{ fontSize: hp(3), width: '100%' }}>Ingredients</Text>
                        {ingredients.length > 0 && ingredients.map((ingredient, index) => (
                            <View key={index} style={styles.ingredientTextContainer}>
                                <Text className="mt-1 font-normal" style={{ fontSize: hp(2.2), color: 'white' }} > {index + 1} - {ingredient}</Text>
                            </View>
                        ))}
                    </Animated.View>
                );
            case 'Measurements':
                return (
                    <Animated.View
                        entering={FadeInDown.duration(500).springify().damping(10)}
                        style={{ width: '100%', height: '100%' }}
                        className="flex-1 items-center justify-center rounded-lg p-2"
                    >
                        <Text className="font-medium text-center" style={{ fontSize: hp(3), width: '100%' }}>Measurements</Text>
                        {measurement.length > 0 && measurement.map((measurement, index) => (
                            <View key={index} style={styles.ingredientTextContainer}>
                                <Text className="mt-1 font-normal" style={{ fontSize: hp(2.2), color: 'white' }} > {measurement}</Text>
                            </View>
                        ))}
                    </Animated.View>
                );
            case 'Recipe-Video':
                return (
                    <Animated.View
                        entering={SlideInRight.duration(200).springify().damping(10)}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <YouTubeIframe
                            webViewProps={{
                                overScrollMode: "never"
                            }}
                            videoId={getYoutubeVideoId(data[0].strYoutube)}
                            height={300}
                            width={400}
                        />
                    </Animated.View>
                );
        }
    }

    return (
        <ScrollView
            className="flex-1 bg-amber-50  space-y-3"
            showsHorizontalScrollIndicator={false}
        >
            {/* Image Contanier */}
            <View style={{ width: '100%', height: hp(55) }} className="rounded-lg flex relative">
                <Image
                    source={{ uri: item.strMealThumb }}
                    style={{ width: '100%', height: hp(55), opacity: 1 }}
                    resizeMode='cover'
                />
                <View className="flex items-center justify-center">
                    <Text style={styles.text}>{item.strMeal}</Text>
                </View>
            </View>

            {/* Tab List */}
            <View style={styles.tabContainer}>
                {tabList && tabList.map((tab, index) => (
                    <Pressable
                        style={[styles.tab, activeTab === tab ? { backgroundColor: 'rgb(239 68 68)' } : { backgroundColor: 'white' }]}
                        onPress={() => setActiveTab(tab)}
                        key={index}
                    >
                        <Text
                            style={[styles.tabText, activeTab === tab ? { color: 'white' } : { color: 'rgb(239 68 68)' }]}
                        >
                            {tab}
                        </Text>
                    </Pressable>
                ))}
            </View>

            {/* Meal Ingredients - Measurements - Recipe Video*/}
            {switcher()}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 45,
        left: 15,
    },
    text: {
        fontSize: hp(3),
        bottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        color: 'white',
        position: 'absolute',
        fontWeight: 'bold',
        marginTop: hp(2.5),
    },
    icon: {
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    tabContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tab: {
        marginHorizontal: 5,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: "rgb(239 68 68)",
        backgroundColor: 'white',
        shadowColor: "rgb(239 68 68)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    tabText: {
        fontSize: hp(1.9)
    },
    ingredientTextContainer: {
        backgroundColor: 'rgba(215, 8, 8, 0.7)',
        width: hp(35),
        height: hp(4.2),
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
})