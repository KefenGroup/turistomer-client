import React, { FC, memo } from "react";
import {
  Grid,
  Rating,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Button,
  Card,
  CardMedia,
  CardContent,
  Divider,
  CardActions,
} from "@mui/material";
import {
  ArrowDownward,
  AssistantDirection,
  CurrencyLira,
  ForkRightRounded,
  StarOutline,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

type Cuisine = {
  id: number;
  name: string;
};
type Restaurant = {
  id: number;
  city: string;
  rating: number;
  longitude: number;
  latitude: number;
  priceHigher: number;
  priceLower: number;
  cuisines: Cuisine[];
  name: string;
};

const RestaurantCard: FC<Restaurant> = memo(function RestaurantCard({
  id,
  name,
  city,
  rating,
  cuisines,
  priceLower,
  priceHigher,
  longitude,
  latitude,
}) {
  const router = useRouter();
  return (
    <Card sx={{ marginBottom: 2, p: 2, maxWidth: 700 }}>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        container
        spacing={2}
      >
        <Grid item xs={5}>
          <CardMedia
            component="img"
            sx={{ height: 140, borderRadius: "5%" }}
            image="/hotelcard.jpg"
          />
        </Grid>

        <Grid item xs={7}>
          <CardContent>
            <Typography color="gray" variant="subtitle1">
              Entire Restaurant in {city}
            </Typography>
            <Typography variant="h4">{name}</Typography>

            <Divider sx={{ marginY: 2 }} />

            <Grid item xs={12}>
              <Typography sx={{ paddingBottom: 1 }} variant="h5">
                Meals
              </Typography>
              <Grid container spacing={2}>
                {["Breakfast", "Brunch", "Lunch", "Dinner"].map(
                  (name, index) => (
                    <Grid item xs={4} key={index}>
                      <Typography variant="h6">{name}</Typography>
                    </Grid>
                  )
                )}
              </Grid>
            </Grid>

            <Divider sx={{ width: 50, marginY: 1 }} />

            <Grid item xs={12}>
              <Typography sx={{ paddingBottom: 1 }} variant="h5">
                Good For
              </Typography>
              <Grid container spacing={2}>
                {cuisines.map(({ name, id }) => (
                  <Grid item xs={4} key={id}>
                    <Typography variant="h6">{name}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Divider sx={{ width: 50, marginY: 1 }} />

            <Grid container spacing={2}>
              {cuisines.length !== 0 && (
                <Grid item xs={12}>
                  <Typography sx={{ paddingBottom: 1 }} variant="h5">
                    Cuisines
                  </Typography>
                  <Grid container spacing={2}>
                    {cuisines.map(({ name, id }) => (
                      <Grid item xs={4} key={id}>
                        <Typography variant="h6">{name}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Divider sx={{ marginY: 2 }} />
            <Grid
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6" display="flex" alignItems="center">
                {rating === -1 ? "?" : rating.toFixed(1)}
                <StarOutline
                  fontSize="large"
                  style={{ color: "orange" }}
                  sx={{ marginLeft: 1 }}
                ></StarOutline>
                {/* {`(${(Math.random() * 1000).toFixed(0)} reviews)`} */}
              </Typography>

              <Typography variant="h6" display="flex" alignItems="center">
                <CurrencyLira /> {priceLower + "  -  "}
                {priceHigher}
              </Typography>

              <CardActions>
                <Button
                  onClick={() =>
                    router.push(`/map?lng=${longitude}&lat=${latitude}`)
                  }
                  startIcon={<ForkRightRounded />}
                >
                  Get Directions
                </Button>
              </CardActions>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
});

export default RestaurantCard;
