let gitHubForm = document.querySelector("#github-form")
gitHubForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let userInput = event.target[0].value
    userListUl.innerHTML = ""
    repoListUl.innerText = ""
    
    fetch(`https://api.github.com/search/users?q=${userInput}`)
    .then(r => r.json())
    .then((usersObj) => {
        usersObj.items.forEach((user)=> {
            if  (user.login === userInput) {
                createUserDivAndRenderUserInfo(user)
            }  
        })
    })
    event.target.reset()
})
let userDiv = document.querySelector("#github-container")
let userListUl = document.querySelector("#user-list")
let repoListUl = document.querySelector("#repos-list")
function createUserDivAndRenderUserInfo(user){
    let userUsernameH1 = document.createElement("h1")
    userUsernameH1.innerText = user.login
    let userAvatarImg = document.createElement("img")
    userAvatarImg.src = user.avatar_url
    let userUrlATag = document.createElement("a")
    userUrlATag.href = user.html_url
    userUrlATag.textContent = user.html_url
    userDiv.append(userListUl)
    userListUl.append(userUsernameH1, userAvatarImg, userUrlATag)
    
    userUsernameH1.addEventListener("click", ()=> {
        repoListUl.innerText = ""
        
        fetch(`https://api.github.com/users/${user.login}/repos`)
        .then(r => r.json())
        .then((repoObj) => {
            repoObj.forEach((repo)=> {
                let repoNameOl = document.createElement("ol")
                repoNameOl.innerText = repo.name
                repoListUl.append(repoNameOl)
                
            })   
        })
    })
}