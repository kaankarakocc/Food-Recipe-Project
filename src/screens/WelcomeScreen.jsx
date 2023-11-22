import { Image, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import Animated, { useSharedValue, withSpring, withRepeat, Easing, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {

    const navigation = useNavigation();

    const duration = 2000;
    const easing = Easing.bezier(0.25, -0.5, 0.25, 1);
    const sv = useSharedValue(0);

    const paddingRounded1 = useSharedValue(0);
    const paddingRounded2 = useSharedValue(0);

    useEffect(() => {
        paddingRounded1.value = 0;
        paddingRounded2.value = 0;
        sv.value = withRepeat(withTiming(1, { duration, easing }), -1);
        setTimeout(() => paddingRounded1.value = withSpring(paddingRounded1.value + hp(5)), 100);
        setTimeout(() => paddingRounded2.value = withSpring(paddingRounded2.value + hp(5.5)), 200);
        setTimeout(() => navigation.navigate('Home'), 2000);
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${sv.value * 360}deg` }],
    }));


    return (
        <View className="flex-1 justify-center items-center bg-red-600 space-y-10">
            <StatusBar style="light" />
            <Animated.View className="rounded-full bg-red-400" style={{ padding: paddingRounded2 }}>
                <Animated.View className="rounded-full bg-red-300" style={{ padding: paddingRounded1 }}>
                    <Animated.Image
                        source={require('../../assets/images/welcome.png')}
                        style={[{ width: hp(20), height: hp(20) }, animatedStyle]}
                    />
                </Animated.View>
            </Animated.View>
            <View className="flex items-center space-y-2">
                <Text style={{ fontSize: hp(5.5) }} className="font-bold text-white tracking-widest">Taste Buddy</Text>
            </View>
            <View className="flex items-center">
                <Text style={{ fontSize: hp(2) }} className="font-medium text-white tracking-widest">
                    Taste the Best, Leave the Rest
                </Text>
            </View>
        </View>
    )
}
