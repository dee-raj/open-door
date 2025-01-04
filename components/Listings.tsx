import { FlatList, Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'expo-router';
import { ListingItemType } from '@/constants/CustomTypes';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

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

  const renderRow: ListRenderItem<ListingItemType> = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <View style={{ marginTop: 20 }}>
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <TouchableOpacity style={{ position: 'absolute', top: 30, right: 30 }}>
              <Ionicons name='heart-outline' size={24} color={Colors.black} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Text style={styles.title}>{item.name}</Text>
              <View style={styles.listingItem}>
                <Ionicons name='star' size={16} color={'red'} />
                <Text>{item.reviews_per_month}</Text>
              </View>
            </View>

            <Text style={{ fontFamily: 'Nunito' }}>{item.room_type}</Text>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Text style={{ fontFamily: "NunitoBold" }}>${item.column_10}</Text>
              <Text style={{ fontFamily: "NunitoBold" }}>night</Text>
            </View>
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    width: '80%'
  },
  listingItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10
  },
});
