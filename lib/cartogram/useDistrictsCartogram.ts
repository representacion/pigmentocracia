import { useCartogram } from "@/lib/cartogram/useCartogram";
import { useCartogramData } from "@/lib/cartogram/useCartogramData";
import { REPO } from "@/config/repo";
import type { DistrictsCartogramDataProperties, DistrictsCartogramGeoJsonProperties } from "@/types/cartogram";

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
    } = useCartogramData<DistrictsCartogramDataProperties>({
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