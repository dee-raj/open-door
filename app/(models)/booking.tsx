import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { BlurView } from 'expo-blur';
import ModelHeader from '@/components/ModelHeader';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { DefaultStyles } from '@/constants/Styles';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const Booking = () => {
    const onClearAll = () => { }
    return (
        <BlurView
            style={styles.screenContainer}
            intensity={95}
            tint='systemChromeMaterialLight'
        >
            {/* Header */}
            <ModelHeader />

            {/* footer */}
            <Animated.View
                style={DefaultStyles.footer}
                entering={SlideInDown.delay(300)}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={onClearAll}>
                        <Text style={styles.clearText}>Clear All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={[
                            DefaultStyles.btn,
                            { flexDirection: 'row', width: '44%' }
                        ]}>
                        <Ionicons name='search-outline'
                            size={24} color={Colors.dark.tint}
                            style={{ marginHorizontal: -7 }} />
                        <Text style={DefaultStyles.btnText}>to Search</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </BlurView>
    )
};

export default Booking;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        marginTop: 77,
    },
    clearText: {
        fontSize: 28,
        fontFamily: "",
        textDecorationLine: 'underline',
        color: Colors.light.tint,
        letterSpacing: 2,
    }

});