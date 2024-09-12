"use client";

import dynamic from "next/dynamic";

const LazyDistrictsCartogram = dynamic(
    () => import("@/components/cartogram/districts").then((mod) => mod.DistrictsCartogram),
    { 
        ssr: false,
        loading: () => (
            <div className="w-full h-[640px]">
                <div className="skeleton w-full h-full"></div>
            </div>
        ) 
    }
);

const Page = ({ }) => {
    return (
        <div>
            <LazyDistrictsCartogram />
        </div>
    );
};

export default Page;