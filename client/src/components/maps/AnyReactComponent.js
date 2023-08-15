/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import GoogleMapReact from "google-map-react";
const key = process.env.REACT_APP_GOOGLE_MAPS;



function Maps() {
  const AnyReactComponent = ({ text }) => (
    <div>
      <img src="https://img.icons8.com/color/48/000000/marker.png" />
    </div>
  );

  const defaultProps = {
    center: {
      lat: -34.593351236177604,
      lng: -58.44448682451128,
    },
    zoom: 12,
  };

  const markerList = [
    {
      lat: -34.60128395583018,
      long: -58.379777830537414,
    },
    {
      lat: -34.559917773807236,
      long: -58.462537059374036,
    },
    {
      lat: -34.59938891773908,
      long: -58.40224397286625,
    },
  ];

  return (
    <div style={{ height: "50vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={ {key} }
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {markerList.map((marker, index) => (
          <AnyReactComponent
            key={index}
            lat={marker.lat}
            lng={marker.long}
            text={marker.name}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}

export default Maps;
