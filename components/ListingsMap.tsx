import React, { memo } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import { GeoListingProps, ListingGeoFeatures } from '@/share/interfacesTypes';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';


const ListingsMap = memo(({ listingsGeo }: {
    listingsGeo: GeoListingProps
}) => {
    const router = useRouter();

    const INITIAL_REGION = {
        latitude: 40.85,
        longitude: 14.25,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
    };

    const onMarkerSelected = (item: ListingGeoFeatures) => {
        // console.log('Selected Marker ID:', item.properties.id);
        // console.log('Marker Data:', item);

        router.push(`/listing/${item.properties.id}`);
    };

    return (
        <View style={styles.container}>
            <MapView
                style={StyleSheet.absoluteFillObject}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                showsMyLocationButton
                initialRegion={INITIAL_REGION}
            >
                {listingsGeo.features.map((item: ListingGeoFeatures) => {
                    // console.log('Rendering Marker:', item);
                    return (
                        <Marker
                            key={item.properties.id}
                            onPress={() => onMarkerSelected(item)}
                            coordinate={{
                                latitude: item.geometry.coordinates[1],
                                longitude: item.geometry.coordinates[0],
                            }}
                        >
                            <View style={styles.marker}>
                                <Text style={styles.markerText}>${item.properties.minimum_nights}</Text>
                            </View>
                        </Marker>
                    );
                })}
            </MapView>
        </View>
    );
});
export default ListingsMap;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 70
    },
    marker: {
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        elevation: 4,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 8
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
    },
    markerText: {
        color: Colors.grey,
        fontSize: 16,
        fontFamily: 'NunitoBold'
    }
})