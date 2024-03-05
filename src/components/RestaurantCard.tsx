import React, { FC } from "react";
import {
  Grid,
  Rating,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Button,
} from "@mui/material";
import { ArrowDownward, AssistantDirection } from "@mui/icons-material";

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

const RestaurantCard: FC<Restaurant> = ({
  id,
  name,
  city,
  rating,
  cuisines,
  priceLower,
  priceHigher,
}) => {
  return (
    <Accordion
      key={id}
      sx={{ width: 800, "& .MuiTypography-root": { fontSize: "15px" } }}
    >
      <AccordionSummary
        expandIcon={<ArrowDownward />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Cusines</Typography>
            <Typography>
              {cuisines.map(({ id, name }) => name).join(", ")}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography component="legend">Rating</Typography>
            <Rating name="read-only" value={rating} readOnly />
          </Grid>

          <Grid item xs={4}>
            <Typography component="legend">City</Typography>
            <Typography>{city}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography component="legend">Price Range</Typography>
            {(priceLower !== -1 || priceHigher !== -1) && (
              <Typography>
                ₺{priceLower} - ₺{priceHigher}
              </Typography>
            )}
          </Grid>
        </Grid>
      </AccordionDetails>
      <AccordionActions>
        <Button
          startIcon={<AssistantDirection />}
          variant="contained"
          style={{ backgroundColor: "green", fontSize: 10 }}
        >
          Get Directions
        </Button>
      </AccordionActions>
    </Accordion>
  );
};

export default RestaurantCard;
