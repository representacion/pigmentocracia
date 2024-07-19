import { GeoJSON } from "react-leaflet";
import { useDistrictsLayer } from "@/lib/cartogram/useDistrisctsLayer";
import type { FeatureCollection, Polygon } from "geojson";
import type { DistrictsCartogramDataProperties, DistrictsCartogramGeoJsonProperties } from "@/types/cartogram";

interface DistrictsCartogramLayerProps {
    vectorData: FeatureCollection<Polygon, DistrictsCartogramGeoJsonProperties>;
    featuresData: DistrictsCartogramDataProperties[];
};

const DistrictsCartogramLayer = ({ vectorData, featuresData }: DistrictsCartogramLayerProps) => {

    const { } = useDistrictsLayer({ vectorData, featuresData });

    return (
        <GeoJSON
            data={vectorData}
            attribution="Cartograma diseñado por <a href='https://github.com/DaveMex/Cartogram_Mexico/' target='_blank'>David Hernández</a>"
        >

        </GeoJSON>
    );
};

export { DistrictsCartogramLayer };