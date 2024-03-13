/* eslint-disable react/no-unescaped-entities */
"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import RestaurantCard from "@/components/RestaurantCard";
import HotelCard from "@/components/HotelCard2";
import FilterCard from "@/components/FilterCard";

export default function HomePage() {
  type ApiDataType = "restaurants" | "hotels";

  const [dataType, setDataType] = useState<ApiDataType>("restaurants");
  const [apiData, setApiData] = useState<any>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      let base = process.env.BASE_URL;
      const req = await fetch(`http://localhost:8080/api/${dataType}/0/30`);
      const data = await req.json();
      console.log(data);
      setApiData(data);
      setIsFetched(true);
    };
    fetchData();
  }, [dataType]);

  return (
    <>
      <style>{"body { overflow: auto; background-color: #e2ebf0; }"}</style>
      <div className={styles.content}>
        <div className={styles.div_categories}>
          <p className={styles.header}>Our Popular Categories</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            position: "relative",
          }}
        >
          <TextField
            sx={{ t: 5, width: "50%", input: { background: "#b4cbd8" } }}
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
          ></TextField>
        </div>

        <FilterCard
          establishmentType={dataType}
          handleEstablishmentType={(e) => {
            setIsFetched(false);
            setDataType(e.target.value as ApiDataType);
          }}
        />

        <div style={{ marginBottom: 50 }}>
          {isFetched &&
            apiData.map((data: any) =>
              dataType === "restaurants" ? (
                <RestaurantCard key={data.id} {...data} />
              ) : (
                <HotelCard key={data.id} {...data} />
              )
            )}
        </div>
      </div>
    </>
  );
}
