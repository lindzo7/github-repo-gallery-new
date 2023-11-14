// Div where profile info will appear
const profileInfo = document.querySelector(".overview");
// Unordered list that displays the repo list
const repoList = document.querySelector(".repo-list");
// Where repo information appears
const repoInfoAppear = document.querySelector(".repos");
// Where individual repo data will appear
const singleRepoData = document.querySelector(".repo-data");
// Selects the Back to Repo Gallery button
const backButton = document.querySelector(".view-repos");
// Selects the input with the "Search by Name" placeholder
const filterInput = document.querySelector(".filter-repos");
// Github username
const username = "lindzo7";


const getInfo = async function () {
    const userRequest = await fetch(`https://api.github.com/users/${username}`);
    const data = await userRequest.json();
    displayUserInfo(data);
};

getInfo();

const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure> <img alt="user avatar" src=${data.avatar_url} /></figure> <div><p><strong>Name:</strong> ${data.name}</p><p><strong>Bio:</strong> ${data.bio}</p><p><strong>Location:</strong> ${data.location}</p><p><strong>Number of public repos:</strong> ${data.public_repos}</p></div>`;
    profileInfo.append(div);

    getRepos();
};

const getRepos = async function () {
    const request = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await request.json();
    console.log(repoData);

    getRepoInfo(repoData);
};

const getRepoInfo = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        targetRepoInfo(repoName);
    }
});

const targetRepoInfo = async function (repoName) {
    const specialRequest = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await specialRequest.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }

    showRepoInfo(repoInfo, languages);
};

const showRepoInfo = function (repoInfo, languages) {
    singleRepoData.innerHTML = "";
    singleRepoData.classList.remove("hide");
    repoInfoAppear.classList.add("hide");
    backButton.classList.remove("hide");
    const divEl = document.createElement("div");
    divEl.innerHTML = `
          <h3>Name: ${repoInfo.name}</h3>
          <p>Description: ${repoInfo.description}</p>
          <p>Default Branch: ${repoInfo.default_branch}</p>
          <p>Languages: ${languages.join(", ")}</p>
          <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrernoopener">View Repo on GitHub!</a>`;
    singleRepoData.append(divEl);
};

backButton.addEventListener("click", function () {
    repoInfoAppear.classList.remove("hide");
    singleRepoData.classList.add("hide");
    backButton.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
    const searchValue = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchLower = searchValue.toLowerCase();
    for (const repo of repos) {
        const innerLower = repo.innerText.toLowerCase();
        if (innerLower.includes(searchLower)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});