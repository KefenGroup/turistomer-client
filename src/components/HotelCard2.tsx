import React, { FC, memo, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Divider,
  CardContent,
  CardMedia,
  Card,
  CardActions,
  Pagination,
} from "@mui/material";
import {
  CurrencyLira,
  StarOutline,
  ForkRightRounded,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { HOTEL_AMENITY_GROUPS } from "@/constants";

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

const HotelCard: FC<Hotel> = memo(function HotelCard({
  id,
  name,
  city,
  rating,
  amenities,
  longitude,
  latitude,
  link,
}) {
  const [page, setPage] = useState(1);

  const filteredAmenities = HOTEL_AMENITY_GROUPS.map((item) => {
    return {
      groupName: item.groupName,
      amenities: item.amenities.filter((val) =>
        amenities.map(({ id, name }) => name).includes(val)
      ),
    };
  }).filter(({ groupName, amenities }) => amenities.length !== 0);

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
              Entire Hotel in {city}
            </Typography>
            <Typography variant="h4">{name}</Typography>
            <Divider sx={{ marginY: 2 }} />
            <Grid container spacing={2}>
              {filteredAmenities.length !== 0 && (
                <Grid sx={{}} item xs={12}>
                  <Typography sx={{ paddingBottom: 1 }} variant="h5">
                    {filteredAmenities[page - 1].groupName}
                  </Typography>
                  <Grid container spacing={0.5}>
                    {filteredAmenities[page - 1].amenities.map(
                      (name, index) => (
                        <Grid item xs={4} key={index}>
                          <Typography variant="h6">{name}</Typography>
                        </Grid>
                      )
                    )}
                  </Grid>
                </Grid>
              )}

              <Pagination
                page={page}
                onChange={(event, val) => setPage(val)}
                sx={{ paddingTop: 1 }}
                count={filteredAmenities.length}
              />
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

              <CardActions>
                <Button
                  onClick={() => {
                    window.open(`https://www.tripadvisor.com.tr/${link}`);
                  }}
                  startIcon={<CurrencyLira />}
                >
                  Checkout the Price
                </Button>
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

export default HotelCard;
