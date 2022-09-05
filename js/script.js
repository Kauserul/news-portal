
const loadMenuBar = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json()
    .catch(error => console.log(error))
    displayMenuBar(data.data.news_category)
};

const displayMenuBar = cetagorys =>{
    // console.log(cetagorys)
    const topNav = document.getElementById('navbarNavAltMarkup');
    for(const cetagory of cetagorys){
        console.log(cetagory)
        const navBarMenu = document.createElement('div');
        navBarMenu.classList.add('navbar-nav')
        navBarMenu.innerHTML = `
            <a onclick="loadCetagoryDetails('${cetagory.category_id}')" class="nav-link me-4 ms-3" href="#">${cetagory.category_name}</a>
        `
        topNav.appendChild(navBarMenu)
    }
};

const loadCetagoryDetails = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json()
    .catch(error => console.log(error));
   displayCetagoryDetails(data)
};

const displayCetagoryDetails = details =>{
    console.log(details)
}

loadCetagoryDetails()
loadMenuBar()