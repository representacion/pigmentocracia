import axios from "axios";
import useSWR, { Fetcher } from "swr";
import { parse } from "csv/sync";

interface useCartogramDataArgs {
    /**
     * The path to the cartogram file (assumed to be a CSV file).
     */
    path: string;
};

const useCartogramData = <Properties extends Record<any, any>>({ path }: useCartogramDataArgs) => {

    const fetcher: Fetcher<Properties[], string> = async (path: string) => {
        const response = await axios.get(path);
        const data = response.data;
        const parsedData = parse(data, {
            columns: true,
            skip_empty_lines: true
        });
        return parsedData
    };

    const { data, isLoading } = useSWR(path, fetcher);

    return {
        data,
        isLoading
    }

};

export { useCartogramData };