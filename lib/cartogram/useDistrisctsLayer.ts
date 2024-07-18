import { useEffect, useMemo } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import type { GeoJSON as GeoJsonObject } from "geojson";

interface useDistrictsLayerArgs {
    vectorData: GeoJsonObject;
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