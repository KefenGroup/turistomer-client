/* eslint-disable react/no-unescaped-entities */
"use client";
import styles from "./page.module.css";
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
enum FetchState {
  INITIAL = "initial",
  FETCHED = "fetched",
  NOT_FETCHED = "not_fetched",
  ZERO_RESULT = "zero_result",
}

export default function HomePage() {
  const [dataType, setDataType] = useState<ApiDataType>("restaurants");
  const [hotelData, setHotelData] = useState<Hotel[]>([]);
  const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]);
  const [apiDataToBeFiltered, setApiDataToBeFiltered] = useState<
    Hotel[] | Restaurant[]
  >([]);
  const [fetchState, setFetchState] = useState<FetchState>(FetchState.INITIAL);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [prompt, setPrompt] = useState<string>("");
  const [promptHistory, setPromptHistory] = useState<string[]>([]);
  const [modelFilter, setModelFilter] = useState<ModelFilter>(null);

  const isModelResponseData = useRef<boolean>(false);

  const emptyModelFilter = {
    cuisine: null,
    location: null,
    meal: null,
    isClose: [0],
    isCheap: null,
    isExpensive: null,
    minRating: 0,
    amenity: null,
    coordinates: null,
  };

  const handleFilter = useCallback(
    (data: Hotel[] | Restaurant[] | "change") => {
      if (data === "change") {
        setApiDataToBeFiltered(
          dataType === "restaurants" ? restaurantData : hotelData
        );
      } else {
        setApiDataToBeFiltered(data);
        setFetchState(FetchState.FETCHED);
      }
    },
    [dataType, hotelData, restaurantData]
  );
  const handleEstablishmentType = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      isModelResponseData.current = false;
      setDataType(value as ApiDataType);

      // if (value === "restaurants") {
      //   if (!restaurantData.length) {
      //     await fetchDataRest();
      //   } else {
      //     setApiDataToBeFiltered(restaurantData);
      //   }
      // } else if (value === "hotels") {
      //   if (!hotelData.length) {
      //     await fetchDataHotel();
      //   } else {
      //     setApiDataToBeFiltered(hotelData);
      //   }
      // }
      if (value === "restaurants") {
        setApiDataToBeFiltered(restaurantData);
      } else if (value === "hotels") {
        setApiDataToBeFiltered(hotelData);
      }
      handleReset();
      // await handleResetFetch();
      // setPromptHistory([]);
    },
    [hotelData, restaurantData]
  );

  const handlePostPrompt = async () => {
    setFetchState(FetchState.NOT_FETCHED);
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
    let basicAIPrompt = ". . .";
    setPromptHistory((prev) => [...prev, basicAIPrompt]);
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
      setFetchState(
        recommendations.length === 0
          ? FetchState.ZERO_RESULT
          : FetchState.FETCHED
      );

      basicAIPrompt = `There are ${recommendations.length} ${dataType} that matched with the filter.`;
    } catch (e) {
      setFetchState(FetchState.ZERO_RESULT);
      basicAIPrompt =
        "Upss! Something went wrong. You can try to reset the filters.";
    }

    setPromptHistory((prev) => {
      return [...prev.slice(0, prev.length - 1), basicAIPrompt];
    });
  };

  const fetchDataRest = async () => {
    try {
      setFetchState(FetchState.NOT_FETCHED);
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/restaurants`
      );
      const data = await req.json();
      setRestaurantData(data);
      setApiDataToBeFiltered(data);
      setFetchState(FetchState.FETCHED);
    } catch {
      console.log("Failed to fetch rest");
      setFetchState(FetchState.ZERO_RESULT);
    }
  };
  const fetchDataHotel = async () => {
    try {
      setFetchState(FetchState.NOT_FETCHED);
      const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hotels`);
      const data = await req.json();
      setHotelData(data);
      setApiDataToBeFiltered(data);
      setFetchState(FetchState.FETCHED);
    } catch {
      console.log("Failed to fetch hotel");
      setFetchState(FetchState.ZERO_RESULT);
    }
  };

  const handleResetFetch = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/model/reset`, {
        method: "POST",
      });
    } catch {
      console.log("Reset had failed");
    }
  };

  const handleReset = async () => {
    await handleResetFetch();
    setApiDataToBeFiltered(
      dataType === "restaurants" ? restaurantData : hotelData
    );
    setFetchState(FetchState.INITIAL);
    setPromptHistory([]);
  };

  useEffect(() => {
    const messageBody = document.getElementById(
      `prompt_${promptHistory.length - 1}`
    );
    messageBody?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [promptHistory]);

  useEffect(() => {
    window.onload = handleReset;
  }, []);

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
          onClick={() => {
            handleReset();
            setModelFilter(emptyModelFilter);
          }}
          size="large"
          sx={{ mt: 2, width: "fit-content", height: "fit-content" }}
          endIcon={<RestartAlt />}
        >
          Reset
        </Button>
      </div>
    );
  };

  const InitialView = () => {
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
        <Typography mb={2} color="gray" textAlign="center" variant="h4">
          Start Digging! Results Will be Displayed Right Here
        </Typography>
      </div>
    );
  };

  const ResultArea = () => {
    switch (fetchState) {
      case FetchState.NOT_FETCHED:
        return <Loading />;
      case FetchState.INITIAL:
        return <InitialView />;
      case FetchState.ZERO_RESULT:
        return <NoResult />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <style>{"body { overflow: auto; background-color: #e2ebf0; }"}</style>
      <div className={styles.content}>
        <div className={styles.chatbox}>
          <ChatBox promptHistory={promptHistory} />

          <div className={styles.prompt}>
            <TextField
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setPromptHistory((prev) => [...prev, prompt]);
                  handlePostPrompt();
                  setPrompt("");
                }
              }}
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
                        handlePostPrompt();
                        setPrompt("");
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
            count={
              fetchState === FetchState.FETCHED
                ? Math.ceil(apiDataToBeFiltered.length / 30)
                : 0
            }
            color="primary"
          />
          <FilterCard
            onReset={handleReset}
            modelFilter={modelFilter}
            handleFetchState={(state: string) =>
              setFetchState(state as FetchState)
            }
            handleFilter={handleFilter}
            establishmentType={dataType}
            handleEstablishmentType={handleEstablishmentType}
          />
          <div>
            {fetchState === FetchState.FETCHED &&
              apiDataToBeFiltered
                .slice((pageNumber - 1) * 30, pageNumber * 30)
                .map((data: any) =>
                  dataType === "restaurants" ? (
                    <RestaurantCard key={data.id} {...data} />
                  ) : (
                    <HotelCard key={data.id} {...data} />
                  )
                )}
            <ResultArea />
          </div>
          <Pagination
            className={styles.bottom_pagination}
            page={pageNumber}
            onChange={(e, val) => {
              setPageNumber(val);
            }}
            count={
              fetchState === FetchState.FETCHED
                ? Math.ceil(apiDataToBeFiltered.length / 30)
                : 0
            }
            color="primary"
          />
        </div>
      </div>
    </>
  );
}
