/* eslint-disable react/no-unescaped-entities */
"use client";
import styles from "./page.module.css";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { RestartAlt, Search, Send } from "@mui/icons-material";
import {
  TextField,
  InputAdornment,
  IconButton,
  Pagination,
  Skeleton,
  Button,
  Typography,
} from "@mui/material";
import RestaurantCard from "@/components/RestaurantCard2";
import HotelCard from "@/components/HotelCard2";
import FilterCard from "@/components/FilterCard";
import ChatBox from "@/components/ChatBox";

export default function HomePage() {
  type ApiDataType = "restaurants" | "hotels";

  const [dataType, setDataType] = useState<ApiDataType>("restaurants");
  const [hotelData, setHotelData] = useState<Hotel[]>([]);
  const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]);
  const [apiDataToBeFiltered, setApiDataToBeFiltered] = useState<
    Hotel[] | Restaurant[]
  >([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [prompt, setPrompt] = useState<string>("");
  const [promptHistory, setPromptHistory] = useState<string[]>([]);
  const [modelFilter, setModelFilter] = useState<ModelFilter>(null);

  const isModelResponseData = useRef<boolean>(false);

  const handleFilter = useCallback(
    (data: Hotel[] | Restaurant[] | "change") => {
      if (data === "change") {
        setApiDataToBeFiltered(
          dataType === "restaurants" ? restaurantData : hotelData
        );
      } else {
        setApiDataToBeFiltered(data);
        setIsFetched(true);
      }
    },
    [dataType, hotelData, restaurantData]
  );
  const handleEstablishmentType = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      isModelResponseData.current = false;
      setDataType(value as ApiDataType);

      if (value === "restaurants") {
        setApiDataToBeFiltered(restaurantData);
      } else if (value === "hotels") {
        setApiDataToBeFiltered(hotelData);
      }
    },
    [hotelData, restaurantData]
  );
  useEffect(() => {
    const fetchDataRest = async () => {
      try {
        const req = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/restaurants`
        );
        const data = await req.json();
        setRestaurantData(data);
        setApiDataToBeFiltered(data);
        setIsFetched(true);
      } catch {
        console.log("Failed to fetch rest");
        setIsFetched(false);
      }
    };
    const fetchDataHotel = async () => {
      try {
        const req = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/hotels`
        );
        const data = await req.json();
        setHotelData(data);
      } catch {
        console.log("Failed to fetch hotel");
      }
    };
    fetchDataRest();
    fetchDataHotel();
  }, []);

  useEffect(() => {
    const messageBody = document.getElementById(
      `prompt_${promptHistory.length - 1}`
    );
    messageBody?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [promptHistory]);

  const postPrompt = async () => {
    let userLoc = { longitude: 0, latitude: 0 };
    navigator.geolocation.getCurrentPosition((position) => {
      userLoc.longitude = position.coords.longitude;
      userLoc.latitude = position.coords.latitude;
    });
    const promptData = {
      type: dataType.substring(0, dataType.length - 1),
      prompt: prompt,
      coordinates: {
        longitude: userLoc.longitude,
        latitude: userLoc.latitude,
      },
    };
    let basicAIPrompt = "";
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/model`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promptData),
      });
      const data = await req.json();
      isModelResponseData.current = true;
      const { filter, recommendations } = data;
      console.log(filter, recommendations);
      setModelFilter(filter as ModelFilter);
      setApiDataToBeFiltered(recommendations);
      basicAIPrompt = "DONE";
    } catch (e) {
      basicAIPrompt = "ERROR";
    }

    setPromptHistory((prev) => [...prev, basicAIPrompt]);
  };

  const handleReset = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/model/reset`, {
        method: "POST",
      });
    } catch {
      console.log("Reset had failed");
    }
    setApiDataToBeFiltered(
      dataType === "restaurants" ? restaurantData : hotelData
    );
  };

  const Loading = () => {
    return Array.from({ length: 30 }).map((val, index) => (
      <>
        <Skeleton
          animation="wave"
          sx={{ mb: 1 }}
          key={index}
          variant="rounded"
          width={600}
          height={350}
        />
        <Skeleton
          sx={{ mb: 2 }}
          variant="rectangular"
          width={600}
          height={20}
        />
      </>
    ));
  };

  const NoResult = () => {
    return (
      <div
        style={{
          height: "70vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="gray" textAlign="center" variant="h4">
          Couldn't Find Any Result Matched with the Filter
        </Typography>
        <Button
          onClick={handleReset}
          size="large"
          sx={{ mt: 2, width: "fit-content", height: "fit-content" }}
          endIcon={<RestartAlt />}
        >
          Reset
        </Button>
      </div>
    );
  };

  return (
    <>
      <style>{"body { overflow: auto; background-color: #e2ebf0; }"}</style>
      <div className={styles.content}>
        <div className={styles.chatbox}>
          <ChatBox promptHistory={promptHistory} />

          <div className={styles.prompt}>
            <TextField
              value={prompt}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPrompt(event.target.value);
              }}
              className={styles.text_field}
              id="filled-basic"
              label="Your Message"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      type="submit"
                      onClick={() => {
                        setPromptHistory((prev) => [...prev, prompt]);
                        postPrompt();
                      }}
                      edge="end"
                    >
                      <Send />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>

        <div className={styles.card_area}>
          <Pagination
            className={styles.top_pagination}
            page={pageNumber}
            onChange={(e, val) => {
              setPageNumber(val);
            }}
            count={Math.ceil(apiDataToBeFiltered.length / 30)}
            color="primary"
          />
          <FilterCard
            onReset={handleReset}
            modelFilter={modelFilter}
            handleIsFetch={(bool) => setIsFetched(bool)}
            handleFilter={handleFilter}
            establishmentType={dataType}
            handleEstablishmentType={handleEstablishmentType}
          />
          <div>
            {isFetched &&
              apiDataToBeFiltered
                .slice((pageNumber - 1) * 30, pageNumber * 30)
                .map((data: any) =>
                  dataType === "restaurants" ? (
                    <RestaurantCard key={data.id} {...data} />
                  ) : (
                    <HotelCard key={data.id} {...data} />
                  )
                )}
            {!isFetched && <Loading />}
            {apiDataToBeFiltered.length === 0 && <NoResult />}
          </div>
          <Pagination
            className={styles.bottom_pagination}
            page={pageNumber}
            onChange={(e, val) => {
              setPageNumber(val);
            }}
            count={Math.ceil(apiDataToBeFiltered.length / 30)}
            color="primary"
          />
        </div>
      </div>
    </>
  );
}
