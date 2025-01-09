import React, { useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Listings from './Listings';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface Listing {
    id: number;
    name: string;
    image_url: string;
    reviews_per_month: number;
    room_type: string;
    column_10: number;
}

interface Props {
    listings: Listing[];
    category: string;
}

const ListingBottomSheet = ({ listings, category }: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [refresh, setRefresh] = useState(0);

    // Snap points for BottomSheet
    const snapPoints = useMemo(() => ['1%', '60%', '100%'], []);

    const showMap = () => {
        bottomSheetRef.current?.collapse();
        setRefresh(refresh + 1);
    };
    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            index={1}
            handleIndicatorStyle={styles.handleIndicator}
            style={styles.sheetContainer}
        >
            <View style={styles.contentContainer}>
                <Listings listings={listings} category={category} refresh={refresh} />
            </View>
            <View style={styles.absoluteBtn}>
                <TouchableOpacity onPress={showMap} style={[styles.btn, styles.handleIndicator]}>
                    <Text style={styles.link}>Map</Text>
                    <Ionicons name="map-sharp" size={20} color="#F4D35A" />
                </TouchableOpacity>
            </View>
        </BottomSheet>
    );
};

export default ListingBottomSheet;

const styles = StyleSheet.create({
    sheetContainer: {
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#222',
        shadowOpacity: 0.5,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 8,
        borderRadius: 5,
        marginTop: -44
    },
    handleIndicator: {
        backgroundColor: Colors.primary,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    absoluteBtn: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
    },
    link: {
        fontFamily: 'NunitoBold',
        fontWeight: 'bold',
        color: '#F4F0CA',
        fontSize: 16,
        marginRight: 4,
    },
});
