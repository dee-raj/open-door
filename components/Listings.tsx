import { FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'expo-router';

interface CategoryListProps {
  listings: any[];
  category: string;
}


const Listings = ({ listings, category }: CategoryListProps) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    console.log("Reload lists...", listings.length);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);

  }, [category]);

  const filteredListings = listings.filter(item => item.category === category);
  const renderRow: ListRenderItem<any> = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`}>
        <TouchableOpacity>
          <View style={{ marginTop: 10 }}>
            <Text>{item?.name}</Text>
          </View>
        </TouchableOpacity>
      </Link>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={loading ? [] : listings}
        ref={listRef}
        renderItem={renderRow}
      />
    </View>
  );
};

export default Listings;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listingItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
