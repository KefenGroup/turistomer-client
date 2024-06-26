import { CITY_NAMES, HOTEL_AMENITIES, RESTAURANT_CUISINES } from "@/constants";
import {
  ArrowDownward,
  ArrowUpward,
  CheckBox,
  CheckBoxOutlineBlank,
  RestartAlt,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Rating,
  Typography,
} from "@mui/material";
import React, { FC, memo, useEffect, useRef, useState } from "react";

type Props = {
  handleEstablishmentType: (data: any) => void;
  handleFilter: (data: Hotel[] | Restaurant[] | "change") => void;
  establishmentType: "restaurants" | "hotels";
  handleFetchState: (state: string) => void;
  modelFilter: ModelFilter;
  onReset: () => void;
};

const emptyCheckedFilter = {
  cuisine: null,
  location: null,
  meal: null,
  isClose: [0],
  priceType: null,
  minRating: 0,
  coordinates: null,
  amenity: null,
};

const FilterCard: FC<Props> = memo(function FilterCard({
  handleEstablishmentType,
  establishmentType,
  handleFilter,
  handleFetchState,
  modelFilter,
  onReset,
}) {
  const [minItemToDisplay, setMinItemToDisplay] = useState<number>(12);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [checkedFilter, setCheckedFilters] = useState<Filter>({
    cuisine: null,
    location: null,
    meal: null,
    isClose: [0],
    priceType: null,
    minRating: 0,
    coordinates: null,
    amenity: null,
  });
  const cardRef = useRef<HTMLDivElement>(null);
  const isModelFilter = useRef<boolean>(false);
  useEffect(() => {
    if (!modelFilter) return;
    const priceType = modelFilter.isCheap
      ? modelFilter.isCheap[0] === 1
        ? "cheap"
        : "expensive"
      : null;
    const checkedFilter = {
      cuisine: modelFilter.cuisine,
      location: modelFilter.location,
      meal: modelFilter.meal,
      isClose: [0],
      priceType: priceType,
      minRating: modelFilter.minRating,
      coordinates: modelFilter.coordinates,
      amenity: modelFilter.amenity,
    };
    isModelFilter.current = true;
    setCheckedFilters(checkedFilter as Filter);
  }, [modelFilter]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsFilterVisible(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [cardRef]);

  useEffect(() => {
    if (isModelFilter.current) {
      isModelFilter.current = false;
      return;
    }
    const postData = {
      cuisine: checkedFilter.cuisine,
      location: checkedFilter.location,
      meal: checkedFilter.meal,
      isClose: [0],
      isExpensive: checkedFilter.priceType === "expensive" ? [1] : [0],
      isCheap: checkedFilter.priceType === "cheap" ? [1] : [0],
      minRating: checkedFilter.minRating,
      coordinates: checkedFilter.coordinates,
      amenity: checkedFilter.amenity,
    };
    const fetchFilteredData = async () => {
      handleFetchState("not_fetched");
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/${establishmentType}/filter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );
      const data = await req.json();
      handleFilter(data);
    };
    // fetchFilteredData();
    if (JSON.stringify(emptyCheckedFilter) !== JSON.stringify(checkedFilter))
      fetchFilteredData();
    else {
      handleFilter("change");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedFilter]);

  function RestaurantFilterCard() {
    return (
      <>
        <Grid item xs={6}>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant="h5">Meals</Typography>
          </FormLabel>
          <FormGroup
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCheckedFilters((prev) => {
                const { value } = e.target;
                if (!prev.meal) return { ...prev, meal: [value] };
                else if (prev.meal.includes(value)) {
                  const newMeal =
                    prev.meal.length === 1
                      ? null
                      : prev.meal.filter((meal) => meal !== value);
                  return { ...prev, meal: newMeal };
                } else return { ...prev, meal: [...prev.meal, value] };
              });
            }}
            row
          >
            {["Breakfast", "Brunch", "Lunch", "Dinner"].map((meal) => (
              <FormControlLabel
                key={meal}
                control={
                  <Checkbox
                    checked={checkedFilter.meal?.includes(meal.toLowerCase())}
                    id="meals"
                    value={meal.toLowerCase()}
                  />
                }
                label={meal}
              />
            ))}
          </FormGroup>
        </Grid>

        <Grid item xs={6}>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant="h5">Price</Typography>
          </FormLabel>
          <RadioGroup
            value={checkedFilter.priceType}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const { value } = e.target;
              return setCheckedFilters({
                ...checkedFilter,
                priceType: value as typeof checkedFilter.priceType,
              });
            }}
            row
          >
            <FormControlLabel
              id="priceType"
              value="cheap"
              control={
                <Radio
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    if (
                      checkedFilter.priceType ===
                      (e.target as HTMLInputElement).value
                    ) {
                      setCheckedFilters({ ...checkedFilter, priceType: null });
                    }
                  }}
                  checkedIcon={<CheckBox />}
                  icon={<CheckBoxOutlineBlank />}
                />
              }
              label="Cheap"
            />
            <FormControlLabel
              id="priceType"
              value="expensive"
              control={
                <Radio
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    if (
                      checkedFilter.priceType ===
                      (e.target as HTMLInputElement).value
                    ) {
                      setCheckedFilters({ ...checkedFilter, priceType: null });
                    }
                  }}
                  checkedIcon={<CheckBox />}
                  icon={<CheckBoxOutlineBlank />}
                />
              }
              label="Expensive"
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={1}></Grid>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant="h5">Dietary Restrictions</Typography>
          </FormLabel>
          <FormGroup
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCheckedFilters((prev) => {
                const { value } = e.target;
                if (!prev.cuisine) return { ...prev, cuisine: [value] };
                else if (prev.cuisine.includes(value)) {
                  const newCuisine =
                    prev.cuisine.length === 1
                      ? null
                      : prev.cuisine.filter((cuisine) => cuisine !== value);
                  return { ...prev, cuisine: newCuisine };
                } else return { ...prev, cuisine: [...prev.cuisine, value] };
              });
            }}
            row
          >
            {["Vegeterian", "Gluten-Free", "Vegan"].map((diet) => (
              <FormControlLabel
                key={diet}
                control={
                  <Checkbox
                    checked={checkedFilter.cuisine?.includes(diet)}
                    id="cuisines"
                    value={diet}
                  />
                }
                label={diet}
              />
            ))}
          </FormGroup>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={1}></Grid>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant="h5">Good for</Typography>
          </FormLabel>
          <FormGroup
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCheckedFilters((prev) => {
                const { value } = e.target;
                if (!prev.amenity) return { ...prev, amenity: [value] };
                else if (prev.amenity.includes(value)) {
                  const newAmenity =
                    prev.amenity.length === 1
                      ? null
                      : prev.amenity.filter((amenity) => amenity !== value);
                  return { ...prev, amenity: newAmenity };
                } else return { ...prev, amenity: [...prev.amenity, value] };
              });
            }}
            row
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedFilter.amenity?.includes("big group")}
                  id="purposes"
                  value="big group"
                />
              }
              label="Big Groups"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedFilter.amenity?.includes("romantic")}
                  id="purposes"
                  value="romantic"
                />
              }
              label="Romantic"
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant="h5">Ratings</Typography>
          </FormLabel>
          <RadioGroup
            value={checkedFilter.minRating}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCheckedFilters({
                ...checkedFilter,
                minRating: parseInt(e.target.value),
              })
            }
            row
          >
            {[5, 4, 3, 2].map((val) => (
              <FormControlLabel
                key={val}
                value={val}
                control={
                  <Radio
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      if (
                        checkedFilter.minRating ===
                        parseInt((e.target as HTMLInputElement).value)
                      ) {
                        setCheckedFilters({
                          ...checkedFilter,
                          minRating: null,
                        });
                      }
                    }}
                    id="rating"
                    checkedIcon={<CheckBox />}
                    icon={<CheckBoxOutlineBlank />}
                  />
                }
                label={
                  <div style={{ justifyContent: "center", display: "flex" }}>
                    <Rating name="read-only" value={val} readOnly />
                    <Box sx={{ ml: 1 }}>{val === 5 ? "" : "& up"}</Box>
                  </div>
                }
              />
            ))}
          </RadioGroup>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1}></Grid>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant="h5">City</Typography>
          </FormLabel>
          <FormGroup
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCheckedFilters((prev) => {
                const { value } = e.target;
                if (!prev.location) return { ...prev, location: [value] };
                else if (prev.location.includes(value)) {
                  const newLocation =
                    prev.location.length === 1
                      ? null
                      : prev.location.filter((location) => location !== value);
                  return { ...prev, location: newLocation };
                } else return { ...prev, location: [...prev.location, value] };
              });
            }}
            row
          >
            {CITY_NAMES.map((city) => (
              <Grid key={city} item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedFilter.location?.includes(city)}
                      id="city"
                      value={city}
                    />
                  }
                  label={city}
                />
              </Grid>
            ))}
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1}></Grid>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant="h5">Cuisines</Typography>
          </FormLabel>
          <FormGroup
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCheckedFilters((prev) => {
                const { value } = e.target;
                if (!prev.cuisine) return { ...prev, cuisine: [value] };
                else if (prev.cuisine.includes(value)) {
                  const newCuisine =
                    prev.cuisine.length === 1
                      ? null
                      : prev.cuisine.filter((cuisine) => cuisine !== value);
                  return { ...prev, cuisine: newCuisine };
                } else return { ...prev, cuisine: [...prev.cuisine, value] };
              });
            }}
            row
          >
            {RESTAURANT_CUISINES.slice(0, minItemToDisplay).map((type) => (
              <Grid key={type} item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedFilter.cuisine?.includes(type)}
                      id="cuisines"
                      value={type}
                    />
                  }
                  label={type}
                />
              </Grid>
            ))}
          </FormGroup>
        </Grid>
      </>
    );
  }

  function HotelFilterCard() {
    return (
      <>
        <Grid item xs={12}>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant="h5">Ratings</Typography>
          </FormLabel>
          <RadioGroup
            value={checkedFilter.minRating}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCheckedFilters({
                ...checkedFilter,
                minRating: parseInt(e.target.value),
              })
            }
            row
          >
            {[5, 4, 3, 2].map((val) => (
              <FormControlLabel
                key={val}
                value={val}
                control={
                  <Radio
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      if (
                        checkedFilter.minRating ===
                        parseInt((e.target as HTMLInputElement).value)
                      ) {
                        setCheckedFilters({
                          ...checkedFilter,
                          minRating: null,
                        });
                      }
                    }}
                    id="rating"
                    checkedIcon={<CheckBox />}
                    icon={<CheckBoxOutlineBlank />}
                  />
                }
                label={
                  <div style={{ justifyContent: "center", display: "flex" }}>
                    <Rating name="read-only" value={val} readOnly />
                    <Box sx={{ ml: 1 }}>{val === 5 ? "" : "& up"}</Box>
                  </div>
                }
              />
            ))}
          </RadioGroup>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1}></Grid>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant="h5">City</Typography>
          </FormLabel>
          <FormGroup
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCheckedFilters((prev) => {
                const { value } = e.target;
                if (!prev.location) return { ...prev, location: [value] };
                else if (prev.location.includes(value)) {
                  const newLocation =
                    prev.location.length === 1
                      ? null
                      : prev.location.filter((location) => location !== value);
                  return { ...prev, location: newLocation };
                } else return { ...prev, location: [...prev.location, value] };
              });
            }}
            row
          >
            {CITY_NAMES.map((city) => (
              <Grid key={city} item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedFilter.location?.includes(city)}
                      id="city"
                      value={city}
                    />
                  }
                  label={city}
                />
              </Grid>
            ))}
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1}></Grid>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant="h5">Amenities</Typography>
          </FormLabel>
          <FormGroup
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCheckedFilters((prev) => {
                const { value } = e.target;
                if (!prev.amenity) return { ...prev, amenity: [value] };
                else if (prev.amenity.includes(value)) {
                  const newAmenity =
                    prev.amenity.length === 1
                      ? null
                      : prev.amenity.filter((amenity) => amenity !== value);
                  return { ...prev, amenity: newAmenity };
                } else return { ...prev, amenity: [...prev.amenity, value] };
              });
            }}
            row
          >
            {HOTEL_AMENITIES.slice(0, minItemToDisplay).map((type) => (
              <Grid key={type} item xs={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="amenity"
                      value={type}
                      checked={checkedFilter.amenity?.includes(type)}
                    />
                  }
                  label={type}
                />
              </Grid>
            ))}
          </FormGroup>
        </Grid>
      </>
    );
  }

  return (
    <div
      ref={cardRef}
      style={{ width: "100%", height: "100%", marginBottom: 20 }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          onClick={() => setIsFilterVisible(!isFilterVisible)}
          variant="contained"
          endIcon={isFilterVisible ? <ArrowDownward /> : <ArrowUpward />}
        >
          <Typography variant="h6">Filter</Typography>
        </Button>

        <Button
          onClick={() => {
            onReset();
            setCheckedFilters(emptyCheckedFilter);
          }}
          sx={{ ml: 1 }}
          variant="contained"
          endIcon={<RestartAlt />}
        >
          <Typography variant="h6">Reset</Typography>
        </Button>
      </div>

      {isFilterVisible && (
        <Card
          sx={{
            backgroundColor: "transparent",
            marginBottom: 2,
            p: 2,
          }}
        >
          <Grid container spacing={2}>
            {establishmentType === "restaurants" ? (
              <RestaurantFilterCard />
            ) : (
              <HotelFilterCard />
            )}

            <div
              style={{
                width: "100%",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Button
                onClick={() => {
                  setMinItemToDisplay((prev) =>
                    prev === RESTAURANT_CUISINES.length ||
                    prev === HOTEL_AMENITIES.length
                      ? 12
                      : establishmentType === "hotels"
                        ? HOTEL_AMENITIES.length
                        : RESTAURANT_CUISINES.length
                  );
                }}
                variant="text"
              >
                <Typography variant="subtitle1">
                  {minItemToDisplay === RESTAURANT_CUISINES.length ||
                  minItemToDisplay === HOTEL_AMENITIES.length
                    ? "Show Less"
                    : "Show More"}
                </Typography>
              </Button>
            </div>
          </Grid>
        </Card>
      )}
    </div>
  );
});

export default FilterCard;
