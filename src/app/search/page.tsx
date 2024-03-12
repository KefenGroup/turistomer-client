/* eslint-disable react/no-unescaped-entities */
"use client";
import styles from "./page.module.css";
import CategoryList from "@/components/CategoryList";
import { useEffect, useState } from "react";
import { ArrowDownward, Search, AssistantDirection } from "@mui/icons-material";
import {
  TextField,
  Grid,
  Rating,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import RestaurantCard from "@/components/RestaurantCard";
import HotelCard from "@/components/HotelCard2";
import Head from "next/head";

export default function HomePage() {
  type ApiDataType = "restaurants" | "hotels";

  const [dataType, setDataType] = useState<ApiDataType>("hotels");
  const [apiData, setApiData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      let base = process.env.BASE_URL;
      const req = await fetch(`http://localhost:8080/api/hotels/0/30`);
      const data = await req.json();
      console.log(data);
      setApiData(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <style>{"body { overflow: auto; background-color: #e2ebf0; }"}</style>
      <div className={styles.content}>
        <div className={styles.div_categories}>
          <p className={styles.header}>Our Popular Categories</p>
          <CategoryList />
        </div>
        <TextField
          sx={{ m: 5, width: "50%", input: { background: "#b4cbd8" } }}
          id="outlined-basic"
          label="Search"
          variant="filled"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
            style: { fontSize: 15 },
          }}
          InputLabelProps={{ style: { fontSize: 12 } }}
        />

        <div style={{ marginBottom: 50 }}>
          {apiData.map((data: any) =>
            dataType === "restaurants" ? (
              <RestaurantCard key={data.id} {...data} />
            ) : (
              <HotelCard key={data.id} {...data} />
            )
          )}
          {/* {restaurants.map(
            ({ id, city, name, rating, cuisines, priceHigher, priceLower }) => (
              <Accordion
                key={id}
                sx={{
                  width: 800,
                  "& .MuiTypography-root": { fontSize: "15px" },
                }}
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
                        {cuisines.map(({ id, name }) => name).join(",")}
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
            )
          )} */}
        </div>
      </div>
    </>
  );
}
