import { View, StyleSheet } from 'react-native';
import React, { useMemo, useState } from 'react';
import { Link, Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import listingsData from '@/assets/data/air-bnb-listings.json';

const Page = () => {
  const [category, setCategory] = useState('Tiny Homes');
  const onDataChange = (category: string) => {
    console.log('Changed Data: ', category);
    setCategory(category);
  };

  const items = useMemo(() => listingsData as any, []);
  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        header: () => <ExploreHeader onCategoryChanged={onDataChange} />,
      }} />
      <Listings listings={items} category={category} />
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
