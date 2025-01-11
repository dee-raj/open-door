import {
    Image, ScrollView, StyleSheet,
    Text, TextInput, TouchableOpacity, View
} from 'react-native';
import React, { useState } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { DefaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { places } from '@/assets/data/places';
import DatePicker from 'react-native-modern-datepicker';
import { guestsData } from '@/assets/data/appDatas';
import { CardProps } from '@/constants/CustomTypes';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const BookingCard = ({ isActive, currentCard, onToggle, }: CardProps) => {
    const [SelectedPlace, setSelectedPlace] = useState(-1);
    const [groups, setGroups] = useState(guestsData);
    const today = new Date().toISOString().substring(0, 10);

    return (
        <View style={[DefaultStyles.card, isActive && styles.activeCard]}>
            {!isActive ? (
                <AnimatedTouchableOpacity
                    onPress={onToggle}
                    style={styles.previewCard}
                    entering={FadeIn.duration(200)}
                    exiting={FadeOut.duration(200)}
                >
                    <Text style={styles.previewText}>{currentCard.title}</Text>
                    <Text style={styles.previewDate}>{currentCard.subtitle}</Text>
                </AnimatedTouchableOpacity>
            ) : (
                <>
                    {currentCard.index == 0 && (
                        <>
                            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
                                Where to?
                            </Animated.Text>

                            <Animated.View style={styles.searchSection}>
                                <Ionicons name='search-sharp' size={24} style={styles.searchIcon} />
                                <TextInput
                                    style={styles.inputField}
                                    placeholder='Search destination'
                                    placeholderTextColor={Colors.grey}
                                />
                            </Animated.View>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ gap: 1 }}
                            >
                                {places.map((place, idx) => (
                                    <TouchableOpacity key={idx * 1.1}
                                        onPress={() => setSelectedPlace(idx)}
                                        style={{ gap: 4 }}
                                    >
                                        <Image source={place.img}
                                            style={SelectedPlace === idx ? styles.selectedPlaceStyle : styles.placeStyle}
                                        />
                                        <Text style={SelectedPlace === idx
                                            ? [styles.placeTitle, { color: Colors.primary }]
                                            : styles.placeTitle}>
                                            {'-> '}{place.title}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </>
                    )}

                    {currentCard.index === 1 && (
                        <>
                            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
                                When's your Trip?
                            </Animated.Text>
                            <DatePicker
                                isGregorian
                                options={{
                                    backgroundColor: '#090C08',
                                    textHeaderColor: '#FFA25B',
                                    textDefaultColor: '#F6E7C1',
                                    selectedTextColor: '#fff',
                                    mainColor: Colors.primary,
                                    textSecondaryColor: '#D6C7A1',
                                    borderColor: 'rgba(122, 146, 165, 0.1)',
                                    textFontSize: 14,
                                }}
                                current={today}
                                selected={today}
                                mode="calendar"
                                minuteInterval={20}
                                style={{ borderRadius: 10 }}
                            />
                        </>
                    )}
                    {currentCard.index === 2 && (
                        <>
                            <Animated.Text entering={FadeIn} style={styles.cardHeader}>
                                Who's Comming?
                            </Animated.Text>

                            <Animated.View>
                                {groups.map((guestItem, idx) => (
                                    <View style={[DefaultStyles.card, styles.guestItemStyle]} key={idx}>
                                        <View>
                                            <Text>{guestItem.name}</Text>
                                            <Text>{guestItem.text}</Text>
                                        </View>
                                        <View style={styles.guestBtnSection}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    if (guestItem.count > 0) {
                                                        const newGGroup = [...groups];
                                                        guestItem.count--;
                                                        setGroups(newGGroup);
                                                    }
                                                }}
                                            >
                                                <Ionicons name='remove-circle-outline' size={26}
                                                    color={guestItem.count > 0 ? Colors.grey : "#cdcdcd"} />
                                            </TouchableOpacity>
                                            <Text>{guestItem.count}</Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    const newGGroup = [...groups];
                                                    guestItem.count++;
                                                    setGroups(newGGroup);
                                                }}
                                            >
                                                <Ionicons name='add-circle-outline' size={26}
                                                    color={Colors.black} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </Animated.View>
                        </>
                    )}
                </>
            )}
        </View>
    );
};


export default BookingCard


const styles = StyleSheet.create({
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
    searchSection: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
        marginBottom: 14,
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth
    },
    searchIcon: { padding: 10 },
    inputField: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    selectedPlaceStyle: {
        height: 120,
        aspectRatio: 1.5,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.dark.tabIconDefault
    },
    placeStyle: {
        height: 110,
        aspectRatio: 1,
        borderRadius: 10,
        marginHorizontal: 20
    },
    placeTitle: {
        paddingLeft: 20,
        fontWeight: 'bold',
        fontFamily: "NunitoBold"
    },
    guestItemStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 16,
    },
    itemBorder: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.grey,
    },
    guestBtnSection: {
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
