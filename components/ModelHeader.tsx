import {
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';

const ModelHeader = () => {
    const [active, setActive] = useState(false);

    const isActiveStyle = (isActive: boolean): TextStyle => ({
        fontSize: active === isActive ? 24 : 18,
        color: active === isActive ? "#000" : Colors.grey,
        textDecorationLine: active === isActive ? "underline" : "none",
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => setActive(false)}
                accessibilityRole="button"
                accessibilityLabel="Select Says"
            >
                <Text style={[styles.text, isActiveStyle(false)]}>Stays</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setActive(true)}
                accessibilityRole="button"
                accessibilityLabel="Select Experience"
            >
                <Text style={[styles.text, isActiveStyle(true)]}>Experience</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ModelHeader;

const styles = StyleSheet.create({
    container: {
        flex: 1 / 18,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        fontFamily: "OutfitSemiBold",
        marginHorizontal: 8,
        height: 'auto'
    },
});
