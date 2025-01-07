import { View, StyleSheet } from 'react-native';
import React, { useMemo, useState } from 'react';
import { Link, Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import listingsData from '@/assets/data/air-bnb-listings.json';
import ListingsMap from '@/components/ListingsMap';
import listingGeoData from '@/assets/data/air-bnb-listings-geo.json'
import ListingBottomSheet from '@/components/ListingBottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Page = () => {
  const [category, setCategory] = useState('Tiny Homes');
  const onDataChange = (category: string) => {
    console.log('Changed Data: ', category);
    setCategory(category);
  };

  const items = useMemo(() => listingsData as any, []);
  const listingGeoItem = useMemo(() => listingGeoData as any, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <Stack.Screen options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChange} />,
        }} />
        <ListingsMap listingsGeo={listingGeoItem} />
        <ListingBottomSheet listings={items} category={category} />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    flex: 1,
    justifyContent: 'space-around',
    borderRadius: 10
  }
});

export default Page;
