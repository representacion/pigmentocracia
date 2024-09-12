import { useCartogramData } from "@/lib/cartogram/useCartogramData";
import { REPO } from "@/config/repo";
import type { DistrictsCartogramDataProperties } from "@/types/cartogram";
import { ColorCheckCard } from "@/components/color-check-card";

const ColorCheckClient = () => {

    const {
        data: districtsData,
        isLoading: districtsDataIsLoading
    } = useCartogramData<DistrictsCartogramDataProperties>({
        path: `/${REPO}/data/distdata.csv`
    });

    if (districtsDataIsLoading || !districtsData) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className="flex flex-row flex-wrap gap-6">
            {districtsData.map((districtData, index) => (
                <ColorCheckCard key={index} districtData={districtData} />
            ))}
        </div>
    )
};

export { ColorCheckClient };