import axios from "axios";
import useSWR, { Fetcher } from "swr";

interface useCartogramDataArgs {
    /**
     * The path to the cartogram file (assumed to be a CSV file).
     */
    path: string;
};

const useCartogramData = <Properties extends Record<any, any>>({ path }: useCartogramDataArgs) => {

    const fetcher: Fetcher<string, string> = async (path: string) => {
        const response = await axios.get(path);
        return response.data;
    };

    const { data, isLoading } = useSWR(path, fetcher);

    return {
        data,
        isLoading
    }

};

export { useCartogramData };