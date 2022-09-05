
const menuBar = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayMenuBar(data.data.news_category)
}

const displayMenuBar = lists=>{
    // console.log(lists)
    const menuBar = document.getElementById('menu-bar');
    lists.forEach(list =>{
        // console.log(list)
        const menuDiv = document.createElement('div');
        menuDiv.innerHTML = `
        <div>
            <a href="#" class="me-5 cetagory">${list.category_name}</a>
        </div>
        `;
        menuBar.appendChild(menuDiv)
    })
};


const loadNews = async () => {
    const url = `https://openapi.programming-hero.com/api/news/category/01`
    const res = await fetch(url);
    const data = await res.json();
    dispalyNews(data.data)
};

const dispalyNews = datas => {
    // console.log(datas)
    const mainCard = document.getElementById('main-card');
    datas.forEach(data => {
        console.log(data)
        const div = document.createElement('div');
        div.classList.add('col-lg-12');
        div.innerHTML = `
        <div class="card mb-3" style="max-width: 1040px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img style="height: 250px" src="${data.image_url}" class="img-fluid rounded-start p-2" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${data.title}</h5>
              <p class="card-text">${(data.details).slice(0, 300)}</p>
              

              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex">
                    <img class="author-pic rounded me-2" src ="${data.author.img}">
                    <div>
                        <p class="mb-0 small">${data.author.name}</p>
                        <p class="mt-0 small">${data.author.published_date}</p>
                    </div>
                </div>

                <div class="pb-0">
                    <span><i class="fas fa-solid fa-eye me-1"></i>${data.total_view}</span>
                </div>

                <div>
                    <i class="fas fa-regular fa-star"></i>
                    <i class="fas fa-regular fa-star"></i>
                    <i class="fas fa-regular fa-star"></i>
                    <i class="fas fa-regular fa-star"></i>
                    <i class="fas fa-regular fa-star"></i>
                </div>

                <div onclick="moreDetails()">
                    <button onclick="displayMoreDetails('${data._id}')" class="btn btn-primary data-bs-toggle="modal" data-bs-toggle="modal" data-bs-target="#exampleModal">See More</button>
                </div>
                
              </div>

            </div>
          </div>
        </div>
      </div>
        `;
        mainCard.appendChild(div)
        
    });
    
};

const displayMoreDetails = news_id =>{
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsDetails(data.data[0]._id))
}

const displayNewsDetails = singleNewsDetails =>{
      console.log(singleNewsDetails)
      const newsTitle = document.getElementById('exampleModalLabel');
      newsTitle.innerText = singleNewsDetails.title
}

menuBar();
loadNews()