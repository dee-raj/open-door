import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import React, { useRef, useState } from 'react';
import { Link } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { categories } from '@/assets/data/categories';


interface ExploreHeaderProps {
    onCategoryChanged: (category: string) => void;
    handleMapFilter: () => void;
}

const ExploreHeader = ({ onCategoryChanged, handleMapFilter }: ExploreHeaderProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(2);
    const scrollRef = useRef<ScrollView>(null);
    const itemRefs = useRef<(View | null)[]>(new Array(categories.length).fill(null));

    const handleCategoryPress = (index: number) => {
        setActiveIndex(index);
        const selected = itemRefs.current[index];

        selected?.measure((px) => scrollRef.current?.scrollTo({ x: px - 22, y: 0, animated: true }));
        onCategoryChanged(categories[index].name);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header Row */}
                <View style={styles.headerFlex}>
                    <Link href="/(models)/booking" asChild>
                        <TouchableOpacity style={styles.searchBtn}>
                            <Ionicons name="search" size={24} color={Colors.grey} />
                            <View>
                                <Text style={styles.searchText}>Where to?</Text>
                                <Text style={styles.subText}>Anywhere - Any week</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>
                    <TouchableOpacity style={styles.filterBtn} onPress={handleMapFilter}>
                        <Ionicons name="options-outline" size={24} color={Colors.light.tabIconSelected} />
                    </TouchableOpacity>
                </View>

                {/* Category Scroll */}
                <ScrollView
                    ref={scrollRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContainer}
                >
                    {categories.map((category, idx) => (
                        <Pressable
                            key={idx}
                            onPress={() => handleCategoryPress(idx)}
                            ref={(el) => itemRefs.current[idx] = el}
                            style={[
                                styles.categoryItem,
                                activeIndex === idx && styles.activeCategoryItem,
                            ]}
                        >
                            <MaterialIcons
                                name={category.icon as any}
                                size={24}
                                color={activeIndex === idx ? Colors.light.tabIconSelected : Colors.grey}
                            />
                            <Text
                                style={[
                                    styles.categoryText,
                                    activeIndex === idx && styles.activeCategoryText,
                                ]}
                            >
                                {category.name}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ExploreHeader;

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "#fff",
    },
    container: {
        backgroundColor: "#fff",
        paddingVertical: 8,
        paddingHorizontal: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { height: 2, width: 0 },
    },
    headerFlex: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        gap: 5
    },
    filterBtn: {
        padding: 15,
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 10,
    },
    searchBtn: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        padding: 10,
        gap: 10,
        backgroundColor: "#fff",
        elevation: 1,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { height: 1, width: 1 },
        borderRadius: 18,
        borderColor: "#D2D2D0",
        borderWidth: StyleSheet.hairlineWidth,
    },
    searchText: {
        fontFamily: "NunitoBold",
        fontSize: 18,
    },
    subText: {
        fontFamily: "SpaceMono",
        color: Colors.grey,
        fontSize: 14,
    },
    scrollContainer: {
        alignItems: "center",
        paddingHorizontal: 5,
    },
    categoryItem: {
        alignItems: "center",
        padding: 8,
        borderRadius: 12,
        backgroundColor: "transparent",
        width: 80
    },
    activeCategoryItem: {
        backgroundColor: Colors.light.tabIconSelected + "15", // Light transparent highlight
        borderBottomColor: Colors.primary + "90",
        borderBottomWidth: 4,
        borderBottomEndRadius: 4,
        borderBottomStartRadius: 4
    },
    categoryText: {
        marginTop: 4,
        fontSize: 14,
        color: Colors.grey,
        textAlign: "center",
    },
    activeCategoryText: {
        color: Colors.light.tabIconSelected,
        fontWeight: "bold"
    },
});
