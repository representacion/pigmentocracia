import { Octokit } from "octokit";

const octokit = new Octokit({
    auth: process.env.NEXT_PUBLIC_GH_TOKEN
});

export { octokit };