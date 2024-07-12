import { octokit } from "@/lib/octokit";
import { REPO, OWNER } from "@/config/repo";
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
    const contributors: Contributor[] = [];

    gitHubContributors.forEach(async contributor => {
        const login = contributor.login;

        if (!login) return;

        const name = await getContributorName(login);
        contributors.push({
            screenName: login,
            href: contributor.html_url || "",
            name: name || login
        });
    });

    return contributors;
}

export { 
    getRepoContributors, getContributorName, 
    buildContributors
};