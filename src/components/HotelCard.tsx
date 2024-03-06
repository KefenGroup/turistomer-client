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
  Link,
  List,
  ListItemText,
  ListItem,
  Divider,
} from "@mui/material";
import {
  ArrowDownward,
  AssistantDirection,
  HotelOutlined,
} from "@mui/icons-material";

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

const HotelCard: FC<Hotel> = ({ id, name, city, rating, amenities, link }) => {
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
        <HotelOutlined fontSize="large" />
        <Typography sx={{ marginLeft: 1, marginRight: 1 }}>{name}</Typography>
        <Rating
          sx={{ marginTop: 0.5 }}
          name="read-only"
          value={rating}
          readOnly
        />
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography component="legend">Rating</Typography>
            <Rating name="read-only" value={rating} readOnly />
          </Grid>

          <Grid item xs={4}>
            <Typography component="legend">City</Typography>
            <Typography>{city}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography component="legend">Price</Typography>
            <Link href={link} underline="hover">
              {"Checkout the current price!"}
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Typography>Group1</Typography>
            <Grid container spacing={1}>
              {amenities.slice(0, 10).map(({ id, name }) => (
                <Grid item xs={4} key={id}>
                  <Typography>{name}</Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography>Group2</Typography>
            <Grid container spacing={1}>
              {amenities.slice(10, 15).map(({ id, name }) => (
                <Grid item xs={4} key={id}>
                  <Typography>{name}</Typography>
                </Grid>
              ))}
            </Grid>
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

export default HotelCard;
