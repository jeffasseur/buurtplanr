import { useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import * as THREE from "three"

const mapOptions = {
    tilt: 25,
    heading: 0,
    zoom: 18,
    center: { lat: 50.8476, lng: 4.3572 },
    mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
    // disable interactions due to animation loop and moveCamera
    disableDefaultUI: true,
    keyboardShortcuts: false,
};

export const Map = () => {
    return (
        <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <BuurtMap />
        </Wrapper>
    )
}

const BuurtMap = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<Object>();

    useEffect(() => {
        const instance = new window.google.maps.Map(ref.current!, mapOptions)
        setMap(instance)
        console.log(instance)
    }, [])

    return (
        <div style={{ width: "100vw", height: "100vh" }} ref={ref} id="map" className="map">
            <h1>not a title</h1>
        </div>
    )
}