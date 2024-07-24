import { Popup } from "react-leaflet";
import { CgExternal } from "react-icons/cg";
import { toTitleCase } from "@/lib/strings";
import type { LatLng } from "leaflet";
import type { DistrictsCartogramDataProperties } from "@/types/cartogram";

interface CartoGramPopupProps {
    popUpData: DistrictsCartogramDataProperties | null;
    popUpPosition: LatLng | null;
    popUpIsOpen: boolean;
};

const CartoGramPopup = ({ popUpData, popUpPosition, popUpIsOpen }: CartoGramPopupProps) => {

    if (!popUpIsOpen || !popUpData) return null;

    return (
        <Popup position={popUpPosition as LatLng}>
            <div className="flex flex-col p-4 gap-y-4">
                <div>
                    <h1 className="font-bold text-base">
                        <span className="text-gray-700">Distrito {popUpData.DISTRITO_FEDERAL}</span>, <span className="text-gray-950">{toTitleCase(popUpData.NOMBRE_ENTIDAD)}</span>
                    </h1>
                    <h2 className="font-bold text-xs text-gray-700">
                        <span>{toTitleCase(popUpData.NOMBRE_DISTRITO_FEDERAL)}</span>
                    </h2>
                </div>
                <div>

                </div>
                <div>
                    <a
                        className="!text-white btn btn-primary w-fit break-keep"
                        href={`https://www.gobernantes.info/mx/person/${popUpData.ID_PERSON_GOBERNANTES}`}
                        target="_blank"
                    >
                        Ver en gobernantes.info <CgExternal size={24}/>
                    </a>
                </div>
            </div>
        </Popup>
    );
};

export { CartoGramPopup };