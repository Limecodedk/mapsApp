import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import './MyMap.scss'
import "leaflet/dist/leaflet.css";

import { Geolocation } from '@capacitor/geolocation';

import { IonLoading, IonRow } from '@ionic/react';
import MyCamera from './MyCamera';

const markerPositions = [
  {
    image: "assets/spot-icons.jpg",
    location: "Skæring",
    name: "Skæring",
    latitude: "56.2314977010896",
    longitude: "10.320953067889777"
  },
  {
    image: "assets/spot-icons.jpg",
    location: "Ebbeltoft",
    name: "glasmuseet",
    latitude: "56.19656102762782",
    longitude: "10.678123381787396"
  },
  {
    image: "assets/spot-icons.jpg",
    location: "Lønstrup",
    name: "lønstrup",
    latitude: "57.47520549523601",
    longitude: "9.797069303027442"
  },
  {
    image: "/assets/position-images/spot-icon.jpg",
    location: "Kalyves",
    name: "Provlita",
    latitude: "35.45508926793525",
    longitude: "24.171037403669782"
  },
  {
    image: "/assets/position-images/spot-icon.jpg",
    location: "Kalyves",
    name: "Dimitra",
    latitude: "35.456922591535694",
    longitude: "24.167508999612433"
  },
  {
    image: "/assets/position-images/spot-icon.jpg",
    location: "Kalyves",
    name: "Cactus coffee",
    latitude: "35.45797294238098",
    longitude: "24.16576565846501"
  },
]


const MyMap = () => {

  const position = [56.23156289658171, 10.320939412058427];
  const [myspot, setMySpot] = useState("");
  const [spot, setSpot] = useState("")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [myPosition, setMyPosition] = useState(null);


  const [showLoading, setShowLoading] = useState(true);


  useEffect(() => {
    (async () => {
      try {
        const coordinates = await Geolocation.getCurrentPosition();
        setMyPosition(coordinates.coords);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    })()

    /* setMySpot(L.icon({ iconUrl: "/assets/my-icon.png" })); */

    const myspot = L.icon({
      iconUrl: '/assets/my-icon.png',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, 0],
    })

    const spot = L.icon({
      iconUrl: '/assets/spot-icon.png',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, 0],
    })

    setMySpot(myspot)
    setSpot(spot)

  }, [])


  if (loading)
    return (
      <IonLoading
        spinner={"bubbles"}
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={"Vent lige lidt... Henter kortdata"}
        duration={5000}
      />
    );

  if (error) return <div>errror</div>

  return (
    <div id='content'>
      <MapContainer center={position} zoom={7} scrollWheelZoom={true} >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={[myPosition.latitude, myPosition.longitude]}
          icon={myspot}
        >
          <Popup>Im here</Popup>
        </Marker>
        {markerPositions.map((data, index) => (
          <Marker
            key={"map" + index}
            id="animate"
            position={[data.latitude, data.longitude]}
            icon={spot}
          >
            <Popup>
              <IonRow className="headline">{data.location}</IonRow>
              <IonRow className="comment">{data.name}</IonRow>
            </Popup>
          </Marker>
        ))}

        <MyCamera position={[myPosition.latitude, myPosition.longitude]} />

      </MapContainer>
    </div >
  )
}

export default MyMap