import { GeoJSON } from "react-leaflet";
import { GeoJSON as GeoJsonObject } from "geojson";
import { useDistrictsLayer } from "@/lib/cartogram/useDistrisctsLayer";

interface DistrictsCartogramLayerProps {
    vectorData: GeoJsonObject;
};

const DistrictsCartogramLayer = ({ vectorData }: DistrictsCartogramLayerProps) => {

    const { } = useDistrictsLayer({ vectorData });

    return (
        <GeoJSON
            data={vectorData}
            attribution="Cartograma diseñado por <a href='https://github.com/DaveMex/Cartogram_Mexico/' target='_blank'>David Hernández</a>"
        >

        </GeoJSON>
    );
};

export { DistrictsCartogramLayer };