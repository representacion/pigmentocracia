import axios from "axios";
import useSWR, { Fetcher } from "swr";
import type { FeatureCollection, Polygon } from "geojson";

interface useCartogramArgs {
    /**
     * The path to the cartogram file (assumed to be a GeoJSON file) with a `FeatureCollection` of `Polygon` features).
     */
    path: string;
};

const useCartogram = <Properties extends Record<any, any>>({ path }: useCartogramArgs) => {

    // Here, I type the fetcher function to ensure that the data returned is a `FeatureCollection` of `Polygon` features.
    const fetcher: Fetcher<FeatureCollection<Polygon, Properties>, string> = async (path: string) => {
        const response = await axios.get(path);
        return response.data;
    };

    const { data, isLoading } = useSWR(path, fetcher);

    return {
        cartogram: data,
        isLoading
    }

};

export { useCartogram };