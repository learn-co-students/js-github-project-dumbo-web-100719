document.addEventListener('DOMContentLoaded',() => {
    console.log('done')
    searchFormAction()
    // fetchGitInfo('dmartinezm')
    
})

let searchFormAction = (nameString) => {
    let searchForm = document.querySelector('#github-form')
    searchForm.addEventListener('submit',(event) => {
        event.preventDefault()
        let searchParam = event.target.search.value
        fetchGitInfo(searchParam)
    })
}

let userSearchResults = (resultObj) => {
    let userUl = document.querySelector('#user-list')
    
    console.log('searchRe: ',resultObj)
    
    resultObj.items.forEach((indivUser) => {
        let userLi = document.createElement('li')
        let userLabel = document.createElement('label')
        userLabel.innerText = 'Username: ' + indivUser.login
        let userImg = document.createElement('img')
        userImg.src = indivUser.avatar_url
        let userLink = document.createElement('a')
        userLink.title = 'my_repos'
        userLink.innerText = 'my repos'
        userLink.href = `javascript:fetchGitRepo('${indivUser.login}')`

        userLink.addEventListener('click',() => {
            fetchGitRepo(indivUser.login)
        })
        userLi.append(userLabel,userImg,userLink)
        userUl.append(userLi)
    })
}

let repoSearchResults = (resultObj) => {
    let repoUl = document.querySelector('#repos-list')
    
    console.log('searcRepo: ',resultObj)
    
    resultObj.forEach((indivRepo) => {
        let repoLi = document.createElement('li')

        let repoLink = document.createElement('a')
        repoLink.title = 'repo_link'
        repoLink.innerText = indivRepo.name
        repoLink.href = indivRepo.html_url
        repoLi.append(repoLink)
        repoUl.append(repoLi)
    })
}



let fetchGitInfo = (userParam) => {
    const url = `https://api.github.com/search/users?q=${userParam}`
    fetch(url, {
    method:'GET',
    headers: { 
         'Content-type': 'application/json',
         'accept': 'application/vnd.github.v3+json'
     },
    })
    .then(resp => resp.json())
    .then(userSearchResults)
    .catch((error) => {console.error(error);})

}

let fetchGitRepo = (repoParam) => {
    const url = `https://api.github.com/users/${repoParam}/repos`
    fetch(url, {
    method:'GET',
    headers: { 
         'Content-type': 'application/json',
         'accept': 'application/vnd.github.v3+json'
     },
    })
    .then(resp => resp.json())
    .then(repoSearchResults)
    .catch((error) => {console.error(error);})
}