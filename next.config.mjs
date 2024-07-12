import { REPO } from "./config/repo";

/** @type {import('next').NextConfig} */
const nextConfig = {
    // "export" allows for static site generation
    output: "export",
    // "basePath" is used to set the base path for the project.
    // Since the project is hosted on GitHub Pages, the base path is the repository name.
    basePath: REPO,
    // Disable image optimization, since we don't have a Node.js server to handle it.
    images: {
        unoptimized: true
    }
};

export default nextConfig;
