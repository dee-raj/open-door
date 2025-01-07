import React, { useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, ListRenderItem } from 'react-native';
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import { ListingItemType as Listing } from '@/constants/CustomTypes';
import Listings from './Listings';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    listings: Listing[];
    category: string;
}

const ListingBottomSheet = ({ listings, category }: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [refresh, setRefresh] = useState(0);

    // Snap points for BottomSheet
    const snapPoints = useMemo(() => ['10%', '50%', '100%'], []);

    const showMap = () => {
        bottomSheetRef.current?.collapse();
        setRefresh(refresh + 1);
    };
    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            index={1}
            handleIndicatorStyle={{
                backgroundColor: Colors.primary,
            }}
            style={styles.sheetContainer}
        >
            <BottomSheetView
                style={styles.contentContainer}>
                <Listings
                    listings={listings}
                    category={category}
                    refresh={refresh}
                />
                <View style={styles.absoluteBtn}>
                    <TouchableOpacity onPress={showMap} style={styles.btn}>
                        <Text style={styles.link}>Map</Text>
                        <Ionicons name="map-sharp" size={20} color="#F4D35A" />
                    </TouchableOpacity>
                </View>
            </BottomSheetView>
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
        marginTop: 10,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    absoluteBtn: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    btn: {
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 4,
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
    },
    link: {
        fontFamily: 'NunitoBold',
        fontWeight: 'bold',
        color: '#F4F0CA',
        fontSize: 16,
    },
});
