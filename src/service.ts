import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { glob } from 'glob';

const repoDir = path.join(__dirname, '../repos');
interface RepoData {
    name: string;
    size: number;
    owner: string[];
    private: boolean;
    fileCount: number;
    ymlContent: any;
    isWebhook: boolean;
}

const getRepoDetail = async (repoName: string): Promise<RepoData | null> => {
    try {
        console.log("repoName : ",repoName);
        // const repoPath = path.join(repoDir, repoName);
        const repoPath = 'D:/0GitHubScrapper/git-scanner-main/repos/repoA/**/*';
        console.log("repoDir : ",repoDir);
        console.log("repoPath : ",repoPath);
        console.log("path.join(repoPath, '**/*') : ",path.join(repoPath, '**/*'));

        const files = await glob(repoPath);
        // const files = await glob(path.join(repoPath, '**/*'));
        console.log("files : ",files);

        const ymlFile = files.find((file) => file.endsWith(".yml"));
        const ownerFile = files.find(file => file.includes("OWNERS"));
        return {
            name: repoName,
            size: await getSize(files),
            owner: ownerFile ? await getOwners(ownerFile) : ["unknown"],
            private: false,
            fileCount: files.length,
            ymlContent: ymlFile ? await getYmlContent(ymlFile as string) : "",
            isWebhook: false,
        };
    } catch (error) {
        console.error("Error getRepoDetail", error);
    }
    return null;
};

const getSize = async (files: string[]): Promise<number> => {
    try {
        const fileMap = files.map(async file => {
            const stats = await fs.promises.stat(file);
            return stats.size; 
        });
        const fileSizes = await Promise.all(fileMap);
        const totalSize = fileSizes.reduce((a, b) => a + b, 0);
        return totalSize;
    } catch (error) {
        console.error("Error getSize", error);
    }
    return 0;
};

const getYmlContent = async (path: string): Promise<any> => {
    try {
        const ymlCont = await fs.promises.readFile(path, 'utf8');
        return ymlCont;
    } catch (error) {
        console.error(`Error YML file - '${path}': `, error);
    }
    return null;
};

const getOwners = async (ownersFilePath: string): Promise<string[]> => {
    try {
        const ownerFileData = await fs.promises.readFile(ownersFilePath, 'utf8');
        const ownersData: any = yaml.load(ownerFileData);
        if (ownersData && ownersData.approvers && Array.isArray(ownersData.approvers)) {
            return ownersData.approvers as string[];
        }
    } catch (error) {
        console.error(`Error owners file - '${ownersFilePath}': `, error);
    };
    return ['unknown'];
};

export const getRepos = async (repoName?: string): Promise<RepoData[] | RepoData | null> => {

    try {
        const folderArr = fs.readdirSync(repoDir).filter(folder => fs.statSync(path.join(repoDir, folder)).isDirectory());

        if (repoName && !folderArr.includes(repoName)) {
            console.error("Folder not found");
            return [];
        }
        if (repoName) {
            return await getRepoDetail(repoName);
        }

        const repoDataArr: RepoData[] = [];
        const pendingPromise: Promise<any>[] = [];
        const scansRepos = 2;
        for (let i = 0; i < folderArr.length; i=i+scansRepos) {  
            const scansFolders = folderArr.slice(i, i+scansRepos);
            const folderDetails = scansFolders.map(repo =>
                getRepoDetail(repo)
                    .then(repoInfo => {repoInfo && repoDataArr.push(repoInfo)})
                    .catch(error => {
                        console.error(`Error '${repo}': `, error.message);
                    })
            );
            pendingPromise.push(...folderDetails);
            await Promise.all(pendingPromise);
        }

        return repoDataArr;
    } catch (error) {
        console.error('An error occurred', error);
        return [];
    }
};
