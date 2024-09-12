import { octokit } from "@/lib/octokit";
import { REPO, OWNER } from "@/config/repo";
import { CONTRIBUTORS } from "@/config/contributors";
import type { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";
import type { Contributor } from "@/types/config/contributors";

const getRepoContributors = async (): Promise<RestEndpointMethodTypes["repos"]["listContributors"]["response"]["data"]>  => {
    const { data } = await octokit.rest.repos.listContributors({
        owner: OWNER,
        repo: REPO
    })

    return data;
}

const getContributorName = async (login: string): Promise<RestEndpointMethodTypes["users"]["getByUsername"]["response"]["data"]["name"]> => {
    const { data } = await octokit.rest.users.getByUsername({
        username: login
    })

    return data.name;
}

const buildContributors = async (): Promise<Contributor[]> => {
    const gitHubContributors = await getRepoContributors();
    let contributors: Contributor[] = [];

    // Process Github contributors
    const contributorsPromises = gitHubContributors.map(async (contributor) => {
        const login = contributor.login;

        if (!login) return null;

        const name = await getContributorName(login);
        return {
            screenName: login,
            href: contributor.html_url || "",
            name: name || login
        } as Contributor;
    });

    const resolvedContributors = (await Promise.all(contributorsPromises)).filter(contributor => contributor !== null) as Contributor[];

    // Add non-Github contributors
    contributors = contributors.concat(resolvedContributors, CONTRIBUTORS);

    return contributors;
}

/**
 * Fetch contributors
 * 
 * This function is a wrapper around the `buildContributors` function. It 
 * is used to fetch the contributors for the site by calling the `buildContributors`
 * and following the signature of the `useSWR` hook.
 * 
 * @param key 
 * @returns 
 */
const fetchContributors = async (key: string): Promise<Contributor[]> => {
    const contributors = await buildContributors();
    return contributors;
};

export { 
    getRepoContributors, getContributorName, 
    buildContributors, fetchContributors
};