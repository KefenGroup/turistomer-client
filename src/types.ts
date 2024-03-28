type Restaurant = {
  id: number;
  city: string;
  rating: number;
  longitude: number;
  latitude: number;
  priceHigher: number;
  priceLower: number;
  cuisines: Attr[];
  meals: Attr[];
  purposes: Attr[];
  name: string;
};

type Amenity = {
  id: number;
  name: string;
};

type Hotel = {
  id: number;
  city: string;
  rating: number;
  longitude: number;
  latitude: number;
  amenities: Amenity[];
  name: string;
  link: string;
};

type Filter = {
  cuisine: string[] | null;
  location: string[] | null;
  meal: string[] | null;
  isClose: number[];
  priceType: "cheap" | "expensive" | null;
  minRating: number | null;
  amenity: string[] | null;
  coordinates: {
    longitude: number;
    latitude: number;
  } | null;
};

type ModelFilter = {
  cuisine: string[] | null;
  location: string[] | null;
  meal: string[] | null;
  isClose: number[];
  isCheap: number[] | null;
  isExpensive: number[] | null;
  minRating: number | null;
  amenity: string[] | null;
  coordinates: {
    longitude: number;
    latitude: number;
  } | null;
} | null;

type ApiDataType = "restaurants" | "hotels";

type ResultArea = {
  fetchState: string;
  apiDataToBeFiltered: Hotel[] | Restaurant[];
  pageNumber: number;
  dataType: ApiDataType;
};
