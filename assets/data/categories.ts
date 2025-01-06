export const categories = [
    { name: "Tiny Homes", icon: "home" },
    { name: "Cabins", icon: "house-siding" },
    { name: "Trending", icon: "local-fire-department" },
    { name: "Play", icon: "videogame-asset" },
    { name: "City", icon: "apartment" },
    { name: "Beach Front", icon: "beach-access" },
    { name: "Country Side", icon: "nature-people" },
];
import listingGeoData from './air-bnb-listings-geo.json';
export { listingGeoData };

export const geoData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [14.290324207811324, 40.84124811435544]
            },
            "properties": {
                "id": 27388423,
                "name": "Azalea B&B - camera e bagno privato (Tulipano)",
                "host_id": 194031792,
                "neighbourhood": "Zona Industriale",
                "room_type": "Private room",
                "column_10": 65,
                "minimum_nights": 2,
                "number_of_reviews": 2,
                "last_review": "2018-08-27",
                "reviews_per_month": 0.09,
                "calculated_host_listings_count": 2,
                "availability_365": 55,
                "updated_date": "2020-06-14",
                "city": "Naples",
                "column_19": "Italy",
                "column_20": "Italy, Naples, Zona Industriale"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point", "coordinates": [14.24752198326693, 40.85219659749466]
            },
            "properties": {
                "id": 28576829,
                "name": "Museum comfort apartment",
                "host_id": 2171449,
                "neighbourhood": "Avvocata",
                "room_type": "Entire home\/apt",
                "column_10": 60,
                "minimum_nights": 2,
                "number_of_reviews": 3,
                "last_review": "2019-07-09", "reviews_per_month": 0.2,
                "calculated_host_listings_count": 1,
                "availability_365": 262,
                "updated_date": "2020-06-14",
                "city": "Naples",
                "column_19": "Italy",
                "column_20": "Italy, Naples, Avvocata"
            }
        },
    ]
};