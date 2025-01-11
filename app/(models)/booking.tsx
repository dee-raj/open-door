import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { BlurView } from 'expo-blur';
import Animated, { FadeIn, FadeOut, SlideInDown } from 'react-native-reanimated';
import { DefaultStyles } from '@/constants/Styles';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import BookingCard from '@/components/BookingCard';
import { cards, guestsData as initialGuestsData } from '@/assets/data/appDatas';

const Booking = () => {
    const router = useRouter();
    const [openCard, setOpenCard] = useState(-1);
    const [guestsData, setGuestsData] = useState(initialGuestsData);

    const toggleCard = (index: number) => {
        setOpenCard((prev) => (prev === index ? -1 : index));
    };

    const onClearAll = () => {
        setGuestsData(initialGuestsData);
        setOpenCard(-1);
    };

    return (
        <BlurView style={styles.screenContainer} intensity={95} tint="systemChromeMaterialLight">
            {/* Header */}
            <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
                <Text style={styles.headerText}>Choose your Preferences...</Text>
            </Animated.View>

            {/* Cards */}
            <ScrollView
                style={styles.cardContainer}
                showsVerticalScrollIndicator={false}
            >
                {cards.map((card) => (
                    <BookingCard
                        key={card.index}
                        isActive={openCard === card.index}
                        currentCard={card}
                        onToggle={() => toggleCard(card.index)}
                        guestsData={guestsData}
                    />
                ))}
            </ScrollView>

            {/* Footer */}
            <Animated.View
                style={[DefaultStyles.footer, { height: 77 }]}
                entering={SlideInDown.delay(300)}
            >
                <View style={styles.footerContainer}>
                    <TouchableOpacity onPress={onClearAll}>
                        <Text style={styles.clearText}>Clear All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={[DefaultStyles.btn, styles.searchButton]}
                    >
                        <Ionicons
                            name="search-outline"
                            size={24}
                            color={Colors.dark.tint}
                        />
                        <Text style={DefaultStyles.btnText}>to Search</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </BlurView>
    );
};

export default Booking;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        marginTop: 77,
    },
    headerText: {
        fontSize: 24,
        fontFamily: "OutfitSemiBold",
        textAlign: "center",
        marginBottom: 16,
        color:Colors.primary
    },
    cardContainer: {
        flex: 1,
        paddingHorizontal: 8,
        marginBottom: 88
    },
    clearText: {
        fontSize: 16,
        fontFamily: "OutfitSemiBold",
        textDecorationLine: "underline",
        color: Colors.light.tint,
        letterSpacing: 1,
    },
    previewText: {
        fontFamily: "SpaceMono",
        fontSize: 18,
        color: Colors.black,
    },
    previewDate: {
        fontFamily: "NunitoItalic",
        fontSize: 14,
        color: Colors.grey,
    },
    previewCard: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 16,
        borderRadius: 10,
        backgroundColor: Colors.light.background,
        marginBottom: 8,
    },
    activeCard: {
        paddingVertical: 20,
        borderRadius: 12,
    },
    cardHeader: {
        fontSize: 24,
        fontFamily: "OutfitSemiBold",
        marginBottom: 8,
    },
    cardContent: {
        fontSize: 16,
        fontFamily: "NunitoItalic",
        color: Colors.grey,
    },
    footerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
    },
    searchButton: {
        flexDirection: "row",
        width: "48%",
    },
    cardBody: {
        paddingHorizontal: 10,
        paddingBottom: 5,
    }
});
