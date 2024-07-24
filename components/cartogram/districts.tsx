"use client";

import L from "leaflet";
import { AttributionControl, MapContainer } from "react-leaflet";
import { DistrictsCartogramLayer } from "@/components/cartogram/districts-layer";
import { useDistrictsCartogram } from "@/lib/cartogram/useDistrictsCartogram";
import { DistrictsCartogramDataProperties } from "@/types/cartogram";

import "leaflet/dist/leaflet.css";
import "@/styles/districts-cartogram.scss";

const DistrictsCartogram = () => {

    const {
        loading,
        districtsGeoJson, statesGeoJson, districtsData
    } = useDistrictsCartogram({});

    if (loading || !districtsGeoJson) {
        return (
            <div className="w-full h-[640px]">
                <div className="skeleton w-full h-full"></div>
            </div>
        )
    }

    return (
        <div className="w-full h-[640px]">
            <MapContainer
                crs={L.CRS.Simple}
                style={{
                    width: "100%",
                    height: "100%"
                }}
                minZoom={-2}
                attributionControl={false}
            >
                <DistrictsCartogramLayer
                    vectorData={districtsGeoJson}
                    featuresData={districtsData as DistrictsCartogramDataProperties[]}
                />
                <AttributionControl
                    position="bottomright"
                    prefix={"Powered by <a href='https://leafletjs.com/' target='_blank'>Leaflet</a>"}
                />
            </MapContainer>
        </div>
    )
};

export { DistrictsCartogram };