import Image from "next/image";
import { Popup } from "react-leaflet";
import { CgExternal, CgUser, CgOrganisation } from "react-icons/cg";
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
        <Popup position={popUpPosition as LatLng} maxWidth={240} minWidth={240}>
            <div className="flex flex-col items-center w-full p-4 gap-y-6">
                <div className="flex flex-col items-center">
                    <h1 className="font-bold text-base text-center">
                        <span className="text-gray-700">Distrito {popUpData.DISTRITO_FEDERAL}</span>, <span className="text-gray-950">{toTitleCase(popUpData.NOMBRE_ENTIDAD)}</span>
                    </h1>
                    <h2 className="font-bold text-xs text-gray-700">
                        <span>{toTitleCase(popUpData.NOMBRE_DISTRITO_FEDERAL)}</span>
                    </h2>
                </div>
                <div className="flex flex-col items-center">
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <Image
                                src={`/pigmentocracia/photos/${popUpData.PHOTO_URL}`}
                                height={104}
                                width={104}
                                alt={popUpData.NOMBRE_DIPUTADO_ELECTO_2024}
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-y-2 items-start">
                    {/* Name */}
                    <div className="flex flex-row gap-x-2 items-center">
                        <div className="bg-base-200 text-base-content rounded p-1">
                            <CgUser className="block" size={24} />
                        </div>
                        <span>
                            {popUpData.NOMBRE_DIPUTADO_ELECTO_2024}
                        </span>
                    </div>
                    {/* Party */}
                    <div className="flex flex-row gap-x-2 items-center">
                        <div className="bg-base-200 text-base-content rounded p-1">
                            <CgOrganisation className="block" size={24} />
                        </div>
                        <span>
                            {popUpData.PARTIDO_2024}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <a
                        className="flex flex-row !text-white btn btn-sm btn-primary w-full text-sm"
                        href={`https://www.gobernantes.info/mx/person/${popUpData.ID_PERSON_GOBERNANTES}`}
                        target="_blank"
                    >
                        <CgExternal className="block" size={24} />
                        <span className="block">
                            Gobernantes.info
                        </span>
                    </a>
                </div>
            </div>
        </Popup>
    );
};

export { CartoGramPopup };