import { Ionicons } from "@expo/vector-icons"
import { ImageSourcePropType } from "react-native"

export interface ListingItemType {
    id: number
    name: string
    host_id: number
    neighbourhood: string
    room_type: string
    column_10: number
    minimum_nights: number
    number_of_reviews: number
    last_review: any
    reviews_per_month: any
    calculated_host_listings_count: number
    availability_365: number
    updated_date: string
    city: string
    column_19: string
    coordinates: Coordinates
    column_20: string
    image_url: string
}

export interface Coordinates {
    lon: number
    lat: number
}
export interface SearchBarProp {
    placeholder: string;
    iconName: keyof typeof Ionicons.glyphMap;
};

export interface ListingGeoFeatures {
    type: string;
    geometry: {
        type: string;
        coordinates: number[];
    };
    properties: ListingItemType;
}

export interface GeoListingProps {
    type: string;
    features: ListingGeoFeatures[]
}

export interface CardProps {
    isActive: boolean;
    currentCard: {
        index: number,
        title: string,
        subtitle: string
    };
    onToggle: () => void;
    guestsData: GuestListProps['guests'];
};

export interface PlaceListProps {
    places: {
        title: string;
        img: ImageSourcePropType;
    }[];
    selectedPlace: number;
    onPlaceSelect: (index: number) => void;
};

export interface GuestListProps {
    guests: {
        name: string;
        text: string;
        count: number;
    }[];
    onGuestCountChange: (index: number, change: number) => void;
};
