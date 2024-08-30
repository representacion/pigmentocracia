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
                // Get position and set it
                const position = event.latlng;
                setPopUpPosition(position);
                // Open pop up
                setPopUpIsOpen(true);

                // Get the district id
                const districtId = feature.properties?.distrito;
                // Find the district data
                const districtData = featuresData.find(d => d.CVEDIS === districtId);
                // Set the district data
                setPopUpData(districtData || null);
            }
        });
    }, [featuresData]);

    const featureStyle = useCallback((feature: Feature<Polygon, DistrictsCartogramGeoJsonProperties>) => {

        // Get the district id
        const districtId = feature.properties?.distrito;
        // Find the district data
        const districtData = featuresData.find(d => d.CVEDIS === districtId);

        // Define the style
        const style: L.PathOptions = {
            fillColor: districtData?.SKIN_TONE || "transparent",
            color: "#ffffff",
            weight: 0.5,
            fillOpacity: 0.75
        };

        return style;
    }, [featuresData]);

    useEffect(() => {
        if (!map || !layerBounds) return;
        console.log("layerBounds", layerBounds);
        console.log("map", map);
        
        map.fitBounds(layerBounds);
    }, [map, layerBounds]);

    return {
        popUpIsOpen,
        popUpData,
        popUpPosition,
        onEachFeature,
        featureStyle
    }

};

export { useDistrictsLayer };