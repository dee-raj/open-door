import { View, StyleSheet } from 'react-native';
import React, { useMemo, useState } from 'react';
import { Link, Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import listingsData from '@/assets/data/air-bnb-listings.json';
import ListingsMap from '@/components/ListingsMap';
import listingGeoData from '@/assets/data/air-bnb-listings-geo.json'

const Page = () => {
  const [category, setCategory] = useState('Tiny Homes');
  const onDataChange = (category: string) => {
    console.log('Changed Data: ', category);
    setCategory(category);
  };

  const items = useMemo(() => listingsData as any, []);
  const listingGeoItem = useMemo(() => listingGeoData as any, []);

  const [mapShow, setMapShow] = useState(false);
  const handleMapFilter = () => {
    setMapShow(!mapShow);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        header: () => <ExploreHeader onCategoryChanged={onDataChange} handleMapFilter={handleMapFilter} />,
      }} />
      {mapShow ?
        <Listings listings={items} category={category} />
        :
        <ListingsMap listingsGeo={listingGeoItem} />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1
  },
  link: {
    color: 'blue',
    fontSize: 16,
    marginVertical: 8,
  },
});

export default Page;
