let form = document.getElementById("github-form")
let userUl = document.getElementById("user-list")
let repoList = document.getElementById("repos-list")

const goToRepoPage = (e) => {
    repoList.innerText = " "
    let username = e.target.nextSibling.innerText
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(resp => resp.json())
    .then(repoArray => {
       return repoArray.map((repo)=>{
           let newRepo = document.createElement("li")
           newRepo.innerText = repo.name
           repoList.append(newRepo)  
       })
    })
}

const handleForm = (e) =>{
    e.preventDefault()
    let searchUser = e.target.search.value
    fetch(`https://api.github.com/search/users?q=${searchUser}`)
    .then(resp => resp.json())
    .then(usersArr => {
       return usersArr.items.map((user)=>{
           let userLi = document.createElement("li")
           let userImage = document.createElement("img")
           userImage.src = user.avatar_url
           userLi.addEventListener("click", goToRepoPage.bind(user.repos_url))
           
           let userLoginName = document.createElement("h2")
           userLoginName.innerText = user.login

           let userProfile = document.createElement("p")
           userProfile.innerText = user.html_url
           
            userLi.append(userImage, userLoginName, userProfile)
            userUl.append(userLi)
        })
    })
    e.target.reset()
}
form.addEventListener("submit", handleForm)

