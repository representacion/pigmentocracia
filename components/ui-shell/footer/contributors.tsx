"use client";

import { useMemo } from "react";
import { useContributors } from "@/lib/contributors/useContributors";

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
        </>
    );
};

export { Contributors };