import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, Share, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ListingItemType } from '@/constants/CustomTypes';
import listingData from '@/assets/data/air-bnb-listings.json';
import Colors from '@/constants/Colors';
import Animated, {
    interpolate, SlideInDown, useAnimatedRef,
    useAnimatedStyle, useScrollViewOffset
} from 'react-native-reanimated';
import { DefaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';

const Img_Height = 350;
const { width } = Dimensions.get('window');

const Page = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const listing: ListingItemType | undefined = (listingData as ListingItemType[]).find(
        (item) => item.id.toString() === id
    );
    const navigation = useNavigation();
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOfset = useScrollViewOffset(scrollRef);

    const shareListing = async () => {
        try {
            await Share.share({
                title: listing?.name || '',
                url: listing?.image_url,
                message: listing?.room_type || '',
            });
        } catch (err) {
            console.log(`Error while sharing: ${err}`);
        }
    };

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollOfset.value, [0, Img_Height / 2], [0, 1]),
        };
    });

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOfset.value,
                        [-Img_Height, 0, Img_Height],
                        [-Img_Height / 4, 0, Img_Height / 0.75]
                    ),
                },
                {
                    scale: interpolate(
                        scrollOfset.value,
                        [-Img_Height, 0, Img_Height],
                        [2, 1, 1]
                    )
                }
            ]
        }
    });


    useEffect(() => {
        navigation.setOptions({
            headerBackground: () => <Animated.View style={[headerAnimatedStyle, styles.header]} />,
            headerRight: () => (
                <View style={styles.bar}>
                    <Pressable style={styles.roundBtn} onPress={() => console.log("Share button pressed")}>
                        <Ionicons name="share-outline" size={22} color={'#111'} />
                    </Pressable>
                    <Pressable style={styles.roundBtn} onPress={() => console.log("Favorite button pressed")}>
                        <Ionicons name="heart-outline" size={22} color={'#000'} />
                    </Pressable>
                </View>
            ),
        });
    }, [navigation, headerAnimatedStyle]);

    if (!listing) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Listing not found!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                scrollEventThrottle={16}
                ref={scrollRef}
            >
                <Animated.Image
                    source={{ uri: listing.image_url }}
                    style={[styles.image, imageAnimatedStyle]}
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{listing.name}</Text>
                    <Text style={styles.details}>Room Type: {listing.room_type}</Text>
                    <Text style={styles.location}>in {listing.city}</Text>
                    <Text style={styles.details}>Price: ${listing.column_10}</Text>
                    <Text style={styles.details}>Reviews per month: {listing.reviews_per_month}</Text>
                </View>
                <View style={styles.divider} />

                <View style={styles.hostView}>
                    <Image source={{ uri: listing.image_url }} style={styles.host} />
                    <View>
                        <Text style={{ fontWeight: '500', fontSize: 16 }}>
                            Hosted by {listing.host_id}
                        </Text>
                        <Text>Host since {listing.updated_date}</Text>
                    </View>
                </View>
                <View style={styles.divider} />

                <Text style={styles.desciption}>{listing.neighbourhood}</Text>
                <Text style={styles.desciption}>{listing.column_20}</Text>
            </Animated.ScrollView>
            <Animated.View style={DefaultStyles.footer} entering={SlideInDown.delay(200)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.footerText}>
                        <Text style={styles.footerPrice}>${listing.availability_365} per night</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={DefaultStyles.btn}>
                        <Text style={DefaultStyles.btnText}>Reserve</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        backgroundColor: '#fff',
    },
    image: {
        height: Img_Height,
        width: width - 10,
        marginLeft: 5,
        borderRadius: 22,
    },
    infoContainer: {
        padding: 24,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        fontFamily: 'NunitoBold',
    },
    details: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    location: {
        fontSize: 18,
        marginTop: 10,
        fontFamily: 'OutfitBlack',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.grey,
        marginVertical: 16,
    },
    host: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: Colors.grey,
    },
    hostView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    desciption: {
        padding: 1,
        fontSize: 14,
        color: Colors.black,
    },
    footerText: {
        height: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    footerPrice: {
        fontSize: 18,
        fontFamily: 'OutfitSemiBold',
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    roundBtn: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        color: Colors.primary,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.grey,
    },
    header: {
        backgroundColor: '#fff',
        height: 100,
        borderBottomColor: Colors.grey,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});
