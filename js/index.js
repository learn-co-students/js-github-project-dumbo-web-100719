


let searchForm = document.querySelector('#github-form')
let userUl = document.querySelector('#user-list')
let repoUl = document.querySelector('#repos-list')

searchForm.addEventListener('submit',(event) => {
    event.preventDefault();
    fetch(`https://api.github.com/search/users?q=${searchForm.search.value}`)
    .then(res => res.json())
    .then(searchArr => {
        searchArr.items.forEach((searchObj) => {
            putSearchOnSite(searchObj)
        }) 
    })
})

function putSearchOnSite(searchObj) {
    let userLi = document.createElement('li')
    userLi.innerText = searchObj.login

    let userAvatar = document.createElement('img')
    userAvatar.src= searchObj.avatar_url
    
    let userUrl = document.createElement('a')
    userUrl.innerText = 'Profile Link'
    userUrl.href = searchObj.html_url  
    


    userLi.append(userAvatar, userUrl)

    userLi.addEventListener('click',(evt) => {
        fetch(`https://api.github.com/users/${searchObj.login}/repos`)
        .then(resp=>resp.json())
        .then(response=>{
            response.forEach((repoObj) => {
                addRepoObjToRepoUl(repoObj)
            })
        })
    })


    userUl.append(userLi)





    
}

let addRepoObjToRepoUl = (repoObj) => {
    let repoLi = document.createElement("li")
    repoUl.innerHTML = ""
    repoLi.className = "repo"
    let repoUrl = document.createElement("a")
    repoUrl.innerText = repoObj.name
    repoUrl.href = repoObj.url
    repoLi.append(repoUrl)
    repoUl.append(repoLi) 
    
}