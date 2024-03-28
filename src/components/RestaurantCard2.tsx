import React, { FC, memo } from "react";
import {
  Grid,
  Typography,
  Button,
  CardMedia,
  CardContent,
  Divider,
  CardActions,
  Box,
} from "@mui/material";
import {
  CurrencyLira,
  ForkRightRounded,
  StarOutline,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

type Attr = {
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
  cuisines: Attr[];
  meals: Attr[];
  purposes: Attr[];
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
  purposes,
  meals,
}) {
  const router = useRouter();
  return (
    <Box sx={{ marginBottom: 2, px: 2, maxWidth: 700 }}>
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

            {meals.length !== 0 && (
              <>
                <Grid item xs={12}>
                  <Typography sx={{ paddingBottom: 1 }} variant="h5">
                    Meals
                  </Typography>
                  <Grid container spacing={2}>
                    {meals.map(({ id, name }) => (
                      <Grid item xs={4} key={id}>
                        <Typography variant="h6">{name}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Divider sx={{ width: 50, marginY: 1 }} />
              </>
            )}

            {purposes.filter(({ id, name }) => name === "nan").length === 0 && (
              <>
                <Grid item xs={12}>
                  <Typography sx={{ paddingBottom: 1 }} variant="h5">
                    Good For
                  </Typography>
                  <Grid container spacing={2}>
                    {purposes.map(({ name, id }) => (
                      <Grid item xs={4} key={id}>
                        <Typography variant="h6">{name}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Divider sx={{ width: 50, marginY: 1 }} />
              </>
            )}

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
              </Typography>

              <Typography variant="h6" display="flex" alignItems="center">
                <CurrencyLira />
                {priceHigher === -1 || priceLower === -1
                  ? "?"
                  : priceLower + "  -  " + priceHigher}
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
      <Divider sx={{ backgroundColor: "#BABABA" }} />
    </Box>
  );
});

export default RestaurantCard;
