import { useEffect, useRef, useState } from "react";
import { Map, Marker, Popup } from "mapbox-gl";
import { MarkerDetails } from "../components/MarkerDetails";

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

  //   useEffect(() => {
  //     mapInitRef.current && mapInitRef.current.on("load", (e) => generateNewMarker({ map: mapInitRef.current, ...mapInitRef.current.getCenter() }))
  //     return () => {
  //       mapInitRef.current?.off("load", generateNewMarker);
  //     };
  //   }, []);
};

const initMap = (container, coordinates, opts) => {
  const map = new Map({
    container: container,
    center: coordinates,
    accessToken:
      "pk.eyJ1Ijoic3VwZXJnYWxhY3RpcHVzIiwiYSI6ImNsbzkwcWtrdDA1bngya21rMm1la2Q2NXMifQ.sDlPzxnnduARjS7IFc7rjQ",
    doubleClickZoom: false,
    ...opts,
  });
  return map;
};

export const generateNewMarker = ({ lat, lng, map }) => {
  const popUp = new Popup({ closeButton: false, anchor: "left" }).setHTML(`
        <div className="popup">
            <div className="flex w-8 h-8 border border-red-700 m-2 p-2">
            [${lng}, ${lat}]
            </div>
        </div>
        `);

  const marker = new Marker({ color: "#63df29", scale: 1.5 })
    .setLngLat([lng, lat])
    .setPopup(popUp)
    .setDraggable(true)
    .addTo(map);

    function onDragEnd() {
        const lngLat = marker.getLngLat();
        coordinates.style.display = 'block';
        coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
    }

    marker.on('dragend', () => {
        const lngLat = marker.getLngLat();
        console.log("dragEnd at", lngLat);
    })
};

