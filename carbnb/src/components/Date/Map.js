"use client";
import "./mapStyles.css";
import React, { useState, useEffect, useRef } from "react";
import {
  APIProvider,
  ControlPosition,
  MapControl,
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

export default function Intro() {
  const [Lat, setLat] = useState("");
  const [Long, setLong] = useState("");

  const [myLat, mysetLat] = useState("");
  const [myLong, mysetLong] = useState("");

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerRef, marker] = useAdvancedMarkerRef();

  const MapHandler = ({ place, marker }) => {
    const map = useMap();

    useEffect(() => {
      if (!map || !place || !marker) return;

      if (place.geometry?.viewport) {
        map.fitBounds(place.geometry?.viewport);
      }
      marker.position = place.geometry?.location;
      mysetLat(marker.position.lat);
      mysetLong(marker.position.lng);
      console.log("LAT:", myLat, "LONG:", myLong);
    }, [map, place, marker]);
    return null;
  };

  const PlaceAutocomplete = ({ onPlaceSelect }) => {
    const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
    const inputRef = useRef(null);
    const places = useMapsLibrary("places");

    useEffect(() => {
      if (!places || !inputRef.current) return;

      const options = {
        fields: ["geometry", "name", "formatted_address"],
      };

      setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);
    useEffect(() => {
      if (!placeAutocomplete) return;

      placeAutocomplete.addListener("place_changed", () => {
        onPlaceSelect(placeAutocomplete.getPlace());
      });
    }, [onPlaceSelect, placeAutocomplete]);
    return (
      <div className="autocomplete-container">
        <input ref={inputRef} />
      </div>
    );
  };

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  });

  return (
    <APIProvider apiKey={process.env.REACT_APP_API_KEY}>
      <div style={{ height: "50vh", width: "50%" }}>
        <Map
          defaultZoom={14}
          defaultCenter={{ lat: Lat, lng: Long }}
          mapId={process.env.REACT_APP_MAP_KEY}
        >
          <AdvancedMarker ref={markerRef} position={null} />
        </Map>
        <MapControl position={ControlPosition.TOP}>
          <div className="autocomplete-control">
            <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
          </div>
        </MapControl>
        <MapHandler place={selectedPlace} marker={marker} />
      </div>
    </APIProvider>
  );
}
