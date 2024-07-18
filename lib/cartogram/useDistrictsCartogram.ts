import { useEffect, useMemo, useState } from "react";
import L, { Map } from "leaflet";
import { useCartogram } from "@/lib/cartogram/useCartogram";
import { REPO } from "@/config/repo";
import { unMountMap, unMountLayer } from "@/lib/leaflet/map/utils";

const useDistrictsCartogram = ({ }) => {

    const { 
        cartogram: districtsGeoJson,
        isLoading: districtsGeoJsonIsLoading
    } = useCartogram({
        path: `${REPO}/data/mexico300-2024.geojson`
    });

    const { 
        cartogram: statesGeoJson,
        isLoading: statesGeoJsonIsLoading
    } = useCartogram({
        path: `${REPO}/data/mexico300bordes-2024.geojson`
    });

    return {
        districtsGeoJson, districtsGeoJsonIsLoading,
        statesGeoJson, statesGeoJsonIsLoading,
        loading: districtsGeoJsonIsLoading || statesGeoJsonIsLoading
    }

};

export { useDistrictsCartogram };