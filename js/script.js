
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
        // console.log(cetagory)
        const navBarMenu = document.createElement('div');
        navBarMenu.classList.add('navbar-nav')
        navBarMenu.innerHTML = `
            <a onclick="loadCategoryDetails('${cetagory.category_id}')" class="nav-link me-4 ms-3" href="#">${cetagory.category_name}</a>
        `
        topNav.appendChild(navBarMenu)
    }
};

const loadCategoryDetails = (id)=>{
    console.log(id)
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => displayCetagoryDetails(data.data))
        .catch(error => displayCetagoryDetails(error))
};

const displayCetagoryDetails = details =>{
    console.log(details);
    const displayNews = document.getElementById('display-news');
    for(const news of details){
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card', 'mb-3')
        newsDiv.innerHTML =`
        <div class="row g-0">
        <div class="col-md-4">
          <img src="${news.image_url}" class="img-fluid rounded-start p-3" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${news.title}</h5>
            <p class="card-text">${(news.details).slice(0, 450)}</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
        `;
        displayNews.appendChild(newsDiv)
    }

}

loadCategoryDetails()
loadMenuBar()