import useSWR from "swr";
import { useCartogram } from "@/lib/cartogram/useCartogram";
import { REPO } from "@/config/repo";
import type { DistrictsCartogramGeoJsonProperties } from "@/types/cartogram";

const useDistrictsCartogram = ({ }) => {

    const { 
        cartogram: districtsGeoJson,
        isLoading: districtsGeoJsonIsLoading
    } = useCartogram<DistrictsCartogramGeoJsonProperties>({
        path: `${REPO}/data/mexico300-2024.geojson`
    });

    const { 
        cartogram: statesGeoJson,
        isLoading: statesGeoJsonIsLoading
    } = useCartogram<DistrictsCartogramGeoJsonProperties>({
        path: `${REPO}/data/mexico300bordes-2024.geojson`
    });

    return {
        districtsGeoJson, districtsGeoJsonIsLoading,
        statesGeoJson, statesGeoJsonIsLoading,
        loading: districtsGeoJsonIsLoading || statesGeoJsonIsLoading
    }

};

export { useDistrictsCartogram };