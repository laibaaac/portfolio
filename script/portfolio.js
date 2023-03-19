// import { handleRoutes } from './modules/router.js'

const main = document.querySelector('main');
const repoList = document.getElementById('repository-list');

// handleRoutes()
const element = (element) => {
    return document.querySelector(element)
}

const theTitel = element('h2')
const theDescription = element('p')

const changeTitel = (repo) => {
    const text = repo
    theTitel.innerHTML = text
}
const changeDescription = (repo) => {
    const descrip = repo
    theDescription.innerHTML = descrip
}

const url = 'https://corsanywhere.herokuapp.com/https://api.github.com/users/laibaaac/repos';
fetchData();


function fetchData() {
    fetch(url)
        .then((response) => response.json())
        .then((repos) => {
            repos.forEach(repo => {

                const repoName = repo.name;
                const repoDescription = repo.description;
                const githubPages = repo.homepage;
                const starredRepo = repo.stargazers_count;
                const repoLink = repo.html_url

                if (starredRepo != 0) {
                    const REPO_DOCS_URL = `https://corsanywhere.herokuapp.com/https://api.github.com/repos/laibaaac/${repo.name}/contents/README.md`;
                    fetch(REPO_DOCS_URL)
                        .then((response) => response.json())
                        .then(() => {
                        let repoElement = displayRepoData(repoName, repoDescription, githubPages, repoLink)
                        repoList.insertAdjacentHTML('beforeend', repoElement);
                        })
                        .catch((error) => { console.error(error)});
                }
            });

        })
        .catch((error) => { console.error(error) });
}

function displayRepoData(repoName, repoDescription, repoLink, repoLiveSite) {
    return `
                 <article>
                    <h2>${repoName}</h2>
                    <p>${repoDescription}</p>  
                    <a href='${repoLiveSite}'>Repository</a> 
                       <a href='${repoLink}'>Demo</a>   
                 </article>
                 `;
}