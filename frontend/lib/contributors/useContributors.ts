import useSWR from "swr";
import { fetchContributors } from "@/lib/contributors";

const useContributors = () => {

    const fetcher = fetchContributors;
    const { data, error, isLoading } = useSWR("/contributors", fetcher);

    return {
        contributors: data,
        error,
        isLoading
    }
};

export { useContributors };