"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useContributors } from "@/lib/contributors/useContributors";
import GobernantesInfoLogo from "@/public/images/gobernantesinfo-logo.svg";
import MorlanLogo from "@/public/images/morlan-logo.svg";
import Link from "next/link";

const Contributors = () => {

    const { contributors, isLoading } = useContributors();

    const contributorsLinks = useMemo(() => {
        if (!contributors) return null;
        return contributors.map((contributor, index) => {
            return (
                <a
                    key={contributor.screenName}
                    href={contributor.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline capitalize"
                >
                    {contributor.name}
                    {index < contributors.length - 1 && ", "}
                </a>
            );
        });
    }, [contributors]);

    if (isLoading) {
        return (
            <span className="loading loading-spinner loading-md"></span>
        );
    }

    return (
        <>
            <p className="text-center">
                Hecho con ❤️ por <span className="inline-flex gap-1">{contributorsLinks}</span>.
            </p>
            <p>
                Con el apoyo de
            </p>
            <div className="flex flex-col items-center align-baseline gap-4">
                <Link href="https://www.gobernantes.info" target="_blank">
                    <Image src={GobernantesInfoLogo} alt="Gobernantes Info Logo" height={48} />
                </Link>
                <Link href="https://www.morlan.mx/" target="_blank">
                    <Image src={MorlanLogo} alt="Morlan Logo" height={48} />
                </Link>
            </div>
        </>
    );
};

export { Contributors };