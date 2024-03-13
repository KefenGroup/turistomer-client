import { CITY_NAMES, HOTEL_AMENITIES, RESTAURANT_CUISINES } from "@/constants";
import {
  ArrowDownward,
  ArrowUpward,
  CheckBox,
  CheckBoxOutlineBlank,
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
import React, { FC, useState } from "react";

type Props = {
  handleEstablishmentType: (e: React.ChangeEvent<HTMLInputElement>) => void;
  establishmentType: "restaurants" | "hotels";
};

const FilterCard: FC<Props> = ({
  handleEstablishmentType,
  establishmentType,
}) => {
  const [minItemToDisplay, setMinItemToDisplay] = useState<number>(12);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

  console.log(minItemToDisplay);
  function RestaurantFilterCard() {
    return (
      <>
        <Grid item xs={6}>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant="h5">Meals</Typography>
          </FormLabel>
          <FormGroup row>
            <FormControlLabel control={<Checkbox />} label="Breakfast" />
            <FormControlLabel control={<Checkbox />} label="Brunch" />
            <FormControlLabel control={<Checkbox />} label="Lunch" />
            <FormControlLabel control={<Checkbox />} label="Dinner" />
          </FormGroup>
        </Grid>

        <Grid item xs={6}>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant="h5">Price</Typography>
          </FormLabel>
          <FormGroup row>
            <FormControlLabel control={<Checkbox />} label="Cheap" />
            <FormControlLabel control={<Checkbox />} label="Average" />
            <FormControlLabel control={<Checkbox />} label="Expensive" />
          </FormGroup>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={1}></Grid>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant="h5">Dietary Restrictions</Typography>
          </FormLabel>
          <FormGroup row>
            <FormControlLabel control={<Checkbox />} label="Vegeterian" />
            <FormControlLabel control={<Checkbox />} label="Gluten-free" />
            <FormControlLabel control={<Checkbox />} label="Vegan" />
          </FormGroup>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={1}></Grid>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant="h5">Good for</Typography>
          </FormLabel>
          <FormGroup row>
            <FormControlLabel control={<Checkbox />} label="Big Groups" />
            <FormControlLabel control={<Checkbox />} label="Romantic" />
            <FormControlLabel control={<Checkbox />} label="Local Cuisine" />
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant="h5">Ratings</Typography>
          </FormLabel>
          <RadioGroup row>
            <FormControlLabel
              value={5}
              control={
                <Radio
                  checkedIcon={<CheckBox />}
                  icon={<CheckBoxOutlineBlank />}
                />
              }
              label={
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <Rating name="read-only" value={5} readOnly />
                  <Box sx={{ ml: 1 }}></Box>
                </div>
              }
            />

            <FormControlLabel
              value={4}
              control={
                <Radio
                  checkedIcon={<CheckBox />}
                  icon={<CheckBoxOutlineBlank />}
                />
              }
              label={
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <Rating name="read-only" value={4} readOnly />
                  <Box sx={{ ml: 1 }}>& up</Box>
                </div>
              }
            />
            <FormControlLabel
              value={3}
              control={
                <Radio
                  checkedIcon={<CheckBox />}
                  icon={<CheckBoxOutlineBlank />}
                />
              }
              label={
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <Rating name="read-only" value={3} readOnly />
                  <Box sx={{ ml: 1 }}>& up</Box>
                </div>
              }
            />
            <FormControlLabel
              value={2}
              control={
                <Radio
                  checkedIcon={<CheckBox />}
                  icon={<CheckBoxOutlineBlank />}
                />
              }
              label={
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <Rating name="read-only" value={2} readOnly />
                  <Box sx={{ ml: 1 }}>& up</Box>
                </div>
              }
            />
          </RadioGroup>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1}></Grid>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant="h5">City</Typography>
          </FormLabel>
          <FormGroup row>
            {CITY_NAMES.map((city) => (
              <Grid key={city} item xs={3}>
                <FormControlLabel control={<Checkbox />} label={city} />
              </Grid>
            ))}
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1}></Grid>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant="h5">Cuisines</Typography>
          </FormLabel>
          <FormGroup row>
            {RESTAURANT_CUISINES.slice(0, minItemToDisplay).map((type) => (
              <Grid key={type} item xs={3}>
                <FormControlLabel control={<Checkbox />} label={type} />
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
        <Grid item xs={6}>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant="h5">Ratings</Typography>
          </FormLabel>
          <RadioGroup row>
            <FormControlLabel
              value={5}
              control={
                <Radio
                  checkedIcon={<CheckBox />}
                  icon={<CheckBoxOutlineBlank />}
                />
              }
              label={
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <Rating name="read-only" value={5} readOnly />
                  <Box sx={{ ml: 1 }}></Box>
                </div>
              }
            />

            <FormControlLabel
              value={4}
              control={
                <Radio
                  checkedIcon={<CheckBox />}
                  icon={<CheckBoxOutlineBlank />}
                />
              }
              label={
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <Rating name="read-only" value={4} readOnly />
                  <Box sx={{ ml: 1 }}>& up</Box>
                </div>
              }
            />
            <FormControlLabel
              value={3}
              control={
                <Radio
                  checkedIcon={<CheckBox />}
                  icon={<CheckBoxOutlineBlank />}
                />
              }
              label={
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <Rating name="read-only" value={3} readOnly />
                  <Box sx={{ ml: 1 }}>& up</Box>
                </div>
              }
            />
            <FormControlLabel
              value={2}
              control={
                <Radio
                  checkedIcon={<CheckBox />}
                  icon={<CheckBoxOutlineBlank />}
                />
              }
              label={
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <Rating name="read-only" value={2} readOnly />
                  <Box sx={{ ml: 1 }}>& up</Box>
                </div>
              }
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={6}>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant="h5">Price</Typography>
          </FormLabel>
          <FormGroup row>
            <FormControlLabel control={<Checkbox />} label="Cheap" />
            <FormControlLabel control={<Checkbox />} label="Average" />
            <FormControlLabel control={<Checkbox />} label="Expensive" />
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1}></Grid>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant="h5">City</Typography>
          </FormLabel>
          <FormGroup row>
            {CITY_NAMES.map((city) => (
              <Grid key={city} item xs={3}>
                <FormControlLabel control={<Checkbox />} label={city} />
              </Grid>
            ))}
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1}></Grid>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant="h5">Amenities</Typography>
          </FormLabel>
          <FormGroup row>
            {HOTEL_AMENITIES.slice(0, minItemToDisplay).map((type) => (
              <Grid key={type} item xs={3}>
                <FormControlLabel control={<Checkbox />} label={type} />
              </Grid>
            ))}
          </FormGroup>
        </Grid>
      </>
    );
  }

  return (
    <div style={{ width: "50%", height: "100%", marginBottom: 20 }}>
      <Button
        onClick={() => setIsFilterVisible(!isFilterVisible)}
        variant="text"
        endIcon={isFilterVisible ? <ArrowDownward /> : <ArrowUpward />}
      >
        <Typography variant="h6">Filter</Typography>
      </Button>
      {isFilterVisible && (
        <Card
          sx={{
            backgroundColor: "transparent",
            marginBottom: 2,
            p: 2,
            maxWidth: 700,
          }}
        >
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="establishmentType-group-label">
                <Typography variant="h5">Establishment Type</Typography>
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="establishmentType-radio-group-label"
                defaultValue="hotels"
                name="radio-buttons-group"
                value={establishmentType}
                onChange={(e) => {
                  setMinItemToDisplay(12);
                  handleEstablishmentType(e);
                }}
              >
                <FormControlLabel
                  value="restaurants"
                  control={
                    <Radio
                      checkedIcon={<CheckBox />}
                      icon={<CheckBoxOutlineBlank />}
                    />
                  }
                  label="Restaurant"
                />
                <FormControlLabel
                  value="hotels"
                  control={
                    <Radio
                      checkedIcon={<CheckBox />}
                      icon={<CheckBoxOutlineBlank />}
                    />
                  }
                  label="Hotel"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
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
};

export default FilterCard;
