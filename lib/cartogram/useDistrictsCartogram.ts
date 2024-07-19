import useSWR from "swr";
import { useCartogram } from "@/lib/cartogram/useCartogram";
import { REPO } from "@/config/repo";
import type { DistrictsCartogramGeoJsonProperties } from "@/types/cartogram";
import { useCartogramData } from "@/lib/cartogram/useCartogramData";

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

    const {
        data: districtsData,
        isLoading: districtsDataIsLoading
    } = useCartogramData({
        path: `${REPO}/data/distdata.csv`
    });

    return {
        districtsGeoJson, districtsGeoJsonIsLoading,
        statesGeoJson, statesGeoJsonIsLoading,
        districtsData, districtsDataIsLoading,
        loading: districtsGeoJsonIsLoading || statesGeoJsonIsLoading || districtsDataIsLoading,
    }

};

export { useDistrictsCartogram };