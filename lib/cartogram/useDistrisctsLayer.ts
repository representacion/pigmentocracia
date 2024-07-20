import { useCallback, useEffect, useMemo, useState } from "react";
import L, { LatLng, Layer } from "leaflet";
import { useMap } from "react-leaflet";
import type { Feature, FeatureCollection, Polygon } from "geojson";
import type { DistrictsCartogramDataProperties, DistrictsCartogramGeoJsonProperties } from "@/types/cartogram";

interface useDistrictsLayerArgs {
    vectorData: FeatureCollection<Polygon, DistrictsCartogramGeoJsonProperties>;
    featuresData: DistrictsCartogramDataProperties[];
};

const useDistrictsLayer = ({ vectorData, featuresData }: useDistrictsLayerArgs) => {

    const [popUpIsOpen, setPopUpIsOpen] = useState(false);
    const [popUpData, setPopUpData] = useState<DistrictsCartogramDataProperties | null>(null);
    const [popUpPosition, setPopUpPosition] = useState<LatLng | null>(null);

    const map = useMap();

    const layerBounds = useMemo(() => {
        const bounds = L.geoJSON(vectorData).getBounds();
        return bounds;
    }, [vectorData]);

    const onEachFeature = useCallback((feature: Feature<Polygon, DistrictsCartogramGeoJsonProperties>, layer: Layer) => {
        // Define click event
        layer.on({
            click: (event) => {
                // Get position
                const position = event.latlng;
                setPopUpPosition(position);
                // Open pop up
                setPopUpIsOpen(true);
            }
        });
    }, []);

    useEffect(() => {
        if (layerBounds) {
            map.fitBounds(layerBounds);
        }
    }, [map, layerBounds]);

    return {
        popUpIsOpen,
        popUpPosition,
        onEachFeature
    }

};

export { useDistrictsLayer };