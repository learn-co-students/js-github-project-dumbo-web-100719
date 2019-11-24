
let searchForm = document.getElementById('github-form')
let userInfoUl = document.getElementById('user-list')

// add event listener to fetch data on click 

searchForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    userInfoUl.innerText = " "
    //console.log(evt.target)
    let query = evt.target.search.value
    fetch(`https://api.github.com/search/users?q=${query}`, {
        method:"GET",
        headers: { 
            'Content-type': 'application/json',
            'accept': 'application/vnd.github.v3+json'
        }

    })
    .then(resp => resp.json())
    .then(json_resp => {
        //console.log(json_resp.items)
        json_resp.items.forEach((user) => {
            //console.log(user)
            createUserLi(user)


            
        })
    })

    
   
})


// function to create the user list from fetched data

function createUserLi(user){
    let userLi = document.createElement("li")
    let userImg = document.createElement("img")
    let userRepoLink = document.createElement("a")
    userRepoLink.href = user.repos_url
    //userRepoLink.innerHtml = user.repos_url
    userImg.src = user.avatar_url
    userLi.innerText = user.login //+ " " + user.img
    //console.log(userLi)
    //userInfoUl.append(userLi, userImg, userRepoLink )
    userRepoLink.append(userImg)
    userInfoUl.append(userLi, userRepoLink)
    
    let userReposOl = document.createElement("ol")

    userLi.addEventListener("click", (evt) => {
        //console.log("hi")
        userReposOl.innerText = " "
        fetch(user.repos_url, {
            method:'GET',
            headers: { 
             'Content-type': 'application/json',
             'accept': 'application/vnd.github.v3+json'
            }
        
        })
        .then(resp => resp.json())
        .then(allReposInfo => {
            //console.log(json_resp[0].full_name)

        allReposInfo.forEach((oneRepoInfo) => {
            displayRepos(oneRepoInfo)
            
        })
        
        })

        function displayRepos(repoInfo){

            userReposLi = document.createElement("li")
            userReposLi.innerText = repoInfo.full_name
            userReposOl.append(userReposLi)
            userLi.append(userReposOl)
        }
        
    })

    

}










    //function to 