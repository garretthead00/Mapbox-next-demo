import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

export const useMap = (container) => {
  const mapInitRef = useRef(null);
  const [lng, setLng] = useState(-93.699346);
  const [lat, setLat] = useState(39.927905);
  const [zoom, setZoom] = useState(13);
  const [projection, setProjection] = useState("globe");
  const [style, setStyle] = useState(
    "mapbox://styles/mapbox/satellite-streets-v11"
  );

  useEffect(() => {
    if (container.current) {
      mapInitRef.current = initMap(container.current, [lng, lat], {
        style: style,
        zoom: zoom,
        projection: projection,
      });
    }
  }, []);

  useEffect(() => {
    mapInitRef.current &&
      mapInitRef.current.on("dblclick", ({ lngLat }) =>
        generateNewMarker({ map: mapInitRef.current, ...lngLat })
      );

    return () => {
      mapInitRef.current?.off("dblclick", generateNewMarker);
    };
  }, []);
};

const initMap = (container, coordinates, opts) => {
  const map = new mapboxgl.Map({
    container: container,
    center: coordinates,
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN,
    doubleClickZoom: false,
    ...opts,
  });

  // Add the control to the map.
  map.addControl(
    new MapboxGeocoder({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN,
      mapboxgl: mapboxgl,
    })
  );
  return map;
};

export const generateNewMarker = ({ lat, lng, map }) => {
  const popUp = new mapboxgl.Popup({ closeButton: false, anchor: "left" })
    .setHTML(`
        <div className="popup">
            <div className="flex w-8 h-8 border border-red-700 m-2 p-2">
            [${lng}, ${lat}]
            </div>
        </div>
        `);

  const marker = new mapboxgl.Marker({ color: "#63df29", scale: 1.5 })
    .setLngLat([lng, lat])
    .setPopup(popUp)
    .setDraggable(true)
    .addTo(map);

  marker.on("dragend", () => {
    const lngLat = marker.getLngLat();
    console.log("dragEnd at", lngLat);
  });
};
