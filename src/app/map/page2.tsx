"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useMap,
  APIProvider,
  Map,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";

export default function DirectionsMap() {
  function Directions() {
    const [directionService, setDirectionService] =
      useState<google.maps.DirectionsService>();
    const [directionRenderer, setDirectionRenderer] =
      useState<google.maps.DirectionsRenderer>();
    const [route, setRoute] = useState<google.maps.DirectionsResult>();

    const map = useMap();
    const routesLibrary = useMapsLibrary("routes");

    useEffect(() => {
      if (!map || !routesLibrary) return;
      setDirectionService(new routesLibrary.DirectionsService());
      setDirectionRenderer(
        new routesLibrary.DirectionsRenderer({
          map,
          panel: document.getElementById("panel") as HTMLElement,
        })
      );
    }, [map, routesLibrary]);

    useEffect(() => {
      directionService
        ?.route({
          origin: new google.maps.LatLng(40.14912, 26.402075),
          destination: new google.maps.LatLng(40.149017, 26.402279),
          travelMode: google.maps.TravelMode.WALKING,
          provideRouteAlternatives: true,
        })
        .then((response) => {
          setRoute(response);
          directionRenderer?.setDirections(response);
        });
    }, [directionService, directionRenderer]);

    return <div style={{ fontSize: 15 }} id="panel"></div>;
  }

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_TOKEN}>
        <Directions />
        <Map
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={3}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        />
      </APIProvider>
    </div>
  );
}
