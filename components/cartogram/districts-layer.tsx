import { GeoJSON } from "react-leaflet";
import { CartoGramPopup } from "@/components/cartogram/popup";
import { useDistrictsLayer } from "@/lib/cartogram/useDistrisctsLayer";
import type { LatLng } from "leaflet";
import type { FeatureCollection, Polygon } from "geojson";
import type { DistrictsCartogramDataProperties, DistrictsCartogramGeoJsonProperties } from "@/types/cartogram";

interface DistrictsCartogramLayerProps {
    vectorData: FeatureCollection<Polygon, DistrictsCartogramGeoJsonProperties>;
    featuresData: DistrictsCartogramDataProperties[];
};

const DistrictsCartogramLayer = ({ vectorData, featuresData }: DistrictsCartogramLayerProps) => {

    const {
        popUpIsOpen, popUpPosition,
        popUpData,
        onEachFeature,
        featureStyle
    } = useDistrictsLayer({ vectorData, featuresData });

    return (
        <>
            <GeoJSON
                data={vectorData}
                attribution="Cartograma diseñado por <a href='https://github.com/DaveMex/Cartogram_Mexico/' target='_blank'>David Hernández</a>"
                onEachFeature={onEachFeature}
                // @ts-ignore
                style={featureStyle}
            />
            <CartoGramPopup
                popUpData={popUpData}
                popUpPosition={popUpPosition as LatLng}
                popUpIsOpen={popUpIsOpen}
            />
        </>

    );
};

export { DistrictsCartogramLayer };