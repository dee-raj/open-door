import { FlatList, Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'expo-router';
import { ListingItemType } from '@/share/interfacesTypes';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { BottomSheetFlatListMethods } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types';

interface CategoryListProps {
  listings: any[];
  category: string;
  refresh: number;
}

const Listings = ({ listings, category, refresh }: CategoryListProps) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<BottomSheetFlatListMethods>(null);

  useEffect(() => {
    if (refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  }, [refresh]);

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
          <View style={{ marginTop: 16, flex: 1 }}>
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
      <BottomSheetFlatList
        data={loading ? [] : listings}
        ref={listRef}
        renderItem={renderRow}
        ListHeaderComponent={<Text style={styles.info}>{listings.length} homes</Text>}
      />
    </View>
  );
};

export default Listings;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: -15,
    marginTop: -10
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
  info: {
    textAlign: 'center',
    fontFamily: 'NunitiBold',
    fontSize: 16,
    fontWeight: 'bold'
  },
});
