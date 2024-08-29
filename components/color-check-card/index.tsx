import { toTitleCase } from "@/lib/strings";
import Image from "next/image";
import type { DistrictsCartogramDataProperties } from "@/types/cartogram";

interface ColorCheckCardProps {
    districtData: DistrictsCartogramDataProperties;
};

const ColorCheckCard = ({ districtData }: ColorCheckCardProps) => {

    return (
        <div className="flex flex-col p-4 border border-base-200 shadow-sm">
            <div>
                <Image
                    src={`/pigmentocracia/photos/${districtData.PHOTO_URL}`}
                    height={120}
                    width={120}
                    alt={districtData.NOMBRE_DIPUTADO_ELECTO_2024}
                    unoptimized
                />
            </div>
            <div className="grid grid-cols-3 text-xs">
                <div className="w-full h-20 p-2 border border-gray-900" style={{ backgroundColor: districtData.SKIN_TONE }}>
                    <div>
                        PERLA (STONE)
                    </div>
                </div>
                <div className="w-full h-20 p-2 border border-gray-900" style={{ backgroundColor: districtData.DOMINANT }}>
                    <div>
                        DOMINANTE
                    </div>
                </div>
                <div className="w-full h-20 p-2 border border-gray-900" style={{ backgroundColor: districtData.TONO_PIEL_KMEDIAS }}>
                    <div>
                        K-MEDIAS
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <h1 className="font-bold text-base text-center">
                    <span className="text-gray-700">Distrito {districtData.DISTRITO_FEDERAL}</span>, <span className="text-gray-950">{toTitleCase(districtData.NOMBRE_ENTIDAD)}</span>
                </h1>
                <h2 className="font-bold text-xs text-gray-700">
                    <span>{toTitleCase(districtData.NOMBRE_DISTRITO_FEDERAL)}</span>
                </h2>
            </div>
        </div>
    );
};

export { ColorCheckCard };
