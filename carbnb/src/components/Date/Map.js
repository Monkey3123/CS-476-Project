"use client";

import React from "react";
import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

export default function Intro() {
  const [Lat, setLat] = useState("");
  const [Long, setLong] = useState("");

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords);
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  });
  //const position = { lat: Lat, lng: Long };

  return (
    <APIProvider apiKey={process.env.REACT_APP_API_KEY}>
      <div style={{ height: "50vh", width: "50%" }}>
        <Map
          defaultZoom={14}
          defaultCenter={{ lat: Lat, lng: Long }}
          mapId={process.env.REACT_APP_MAP_KEY}
        ></Map>
      </div>
    </APIProvider>
  );
}
