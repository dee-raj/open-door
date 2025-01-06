import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { DefaultStyles } from '@/constants/Styles';
import { StyleSheet, Text, View } from 'react-native';
import { GeoListingProps } from '@/constants/CustomTypes';


const ListingsMap = ({ listingsGeo }: {
    listingsGeo: GeoListingProps
}) => {
    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                showsMyLocationButton
                showsTraffic
                showsBuildings
                showsCompass
                showsIndoorLevelPicker
                showsIndoors
                showsPointsOfInterest
                showsScale
            />
        </View>
    )
}
export default ListingsMap

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%'
    }
})