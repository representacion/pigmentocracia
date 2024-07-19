import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import type { FeatureCollection, Polygon } from "geojson";
import type { DistrictsCartogramDataProperties, DistrictsCartogramGeoJsonProperties } from "@/types/cartogram";

interface useDistrictsLayerArgs {
    vectorData: FeatureCollection<Polygon, DistrictsCartogramGeoJsonProperties>;
    featuresData: DistrictsCartogramDataProperties[];
};

const useDistrictsLayer = ({ vectorData }: useDistrictsLayerArgs) => {

    const map = useMap();

    const layerBounds = useMemo(() => {
        const bounds = L.geoJSON(vectorData).getBounds();
        return bounds;
    }, [vectorData]);

    useEffect(() => {
        if (layerBounds) {
            map.fitBounds(layerBounds);
        }
    }, [map, layerBounds]);

    return {

    }

};

export { useDistrictsLayer };