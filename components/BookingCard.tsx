import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { DefaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { places } from "@/assets/data/places";
import DatePicker from "react-native-modern-datepicker";
import { CardProps, GuestListProps, PlaceListProps, SearchBarProp } from "@/share/interfacesTypes";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

// --- Reusable Components ---
const SectionHeader = ({ title }: { title: string }) => (
    <Animated.Text entering={FadeIn} style={styles.cardHeader}>
        {title}
    </Animated.Text>
);

const SearchBar = ({ placeholder, iconName, }: SearchBarProp) => (
    <Animated.View style={styles.searchSection}>
        <Ionicons name={iconName} size={24} style={styles.searchIcon} />
        <TextInput
            style={styles.inputField}
            placeholder={placeholder}
            placeholderTextColor={Colors.grey}
        />
    </Animated.View>
);

const PlaceList = ({ places, selectedPlace, onPlaceSelect, }: PlaceListProps) => (
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 1 }}
    >
        {places.map((place, idx) => (
            <TouchableOpacity key={idx} onPress={() => onPlaceSelect(idx)} style={{ gap: 4 }}>
                <Image
                    source={place.img}
                    style={selectedPlace === idx ? styles.selectedPlaceStyle : styles.placeStyle}
                />
                <Text
                    style={[
                        styles.placeTitle,
                        selectedPlace === idx && { color: Colors.primary },
                    ]}
                >
                    {"-> "} {place.title}
                </Text>
            </TouchableOpacity>
        ))}
    </ScrollView>
);

const GuestList = ({ guests, onGuestCountChange, }: GuestListProps) => (
    <Animated.View>
        {guests.map((guest, idx) => (
            <View style={[DefaultStyles.card, styles.guestItemStyle]} key={idx}>
                <View>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>{guest.name}</Text>
                    <Text>{guest.text}</Text>
                </View>
                <View style={styles.guestBtnSection}>
                    <TouchableOpacity onPress={() => onGuestCountChange(idx, -1)}
                        disabled={guest.count <= 0}
                    >
                        <Ionicons
                            name="remove-circle-outline"
                            size={26}
                            color={guest.count > 0 ? Colors.grey : "#cdcdcd"}
                        />
                    </TouchableOpacity>
                    <Text style={{ minWidth: 16, textAlign: 'right' }}>{guest.count}</Text>
                    <TouchableOpacity onPress={() => onGuestCountChange(idx, 1)}>
                        <Ionicons
                            name="add-circle-outline"
                            size={26}
                            color={Colors.black}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        ))}
    </Animated.View>
);

// --- Main Component ---
const BookingCard = ({ isActive, currentCard, onToggle, guestsData }: CardProps) => {
    const [selectedPlace, setSelectedPlace] = useState(-1);
    const [groups, setGroups] = useState(guestsData);
    const today = new Date().toISOString().substring(0, 10);

    const handleGuestCountChange = (index: number, change: number) => {
        const updatedGroups = [...groups];
        updatedGroups[index].count += change;
        setGroups(updatedGroups);
    };

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
                    {currentCard.index === 0 && (
                        <>
                            <SectionHeader title="Where to?" />
                            <SearchBar
                                placeholder="Search destination"
                                iconName="search-sharp"
                            />
                            <PlaceList
                                places={places}
                                selectedPlace={selectedPlace}
                                onPlaceSelect={setSelectedPlace}
                            />
                        </>
                    )}

                    {currentCard.index === 1 && (
                        <>
                            <SectionHeader title="When's your Trip?" />
                            <DatePicker
                                isGregorian
                                options={{
                                    backgroundColor: "#090C08",
                                    textHeaderColor: "#FFA25B",
                                    textDefaultColor: "#F6E7C1",
                                    selectedTextColor: "#fff",
                                    mainColor: Colors.primary,
                                    textSecondaryColor: "#D6C7A1",
                                    borderColor: "rgba(122, 146, 165, 0.1)",
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
                            <SectionHeader title="Who's Coming?" />
                            <GuestList guests={groups}
                                onGuestCountChange={handleGuestCountChange}
                            />
                        </>
                    )}
                </>
            )}
        </View>
    );
};

export default BookingCard;

// --- Styles ---
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        marginBottom: 14,
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth,
    },
    searchIcon: { padding: 10 },
    inputField: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    selectedPlaceStyle: {
        height: 120,
        aspectRatio: 1.5,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.dark.tabIconDefault,
    },
    placeStyle: {
        height: 110,
        aspectRatio: 1,
        borderRadius: 10,
        marginHorizontal: 20,
    },
    placeTitle: {
        paddingLeft: 20,
        fontWeight: "bold",
        fontFamily: "NunitoBold",
    },
    guestItemStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingVertical: 16,
    },
    guestBtnSection: {
        gap: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
});
