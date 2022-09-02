const loadNews = async () => {
    const url = `https://openapi.programming-hero.com/api/news/category/01`
    const res = await fetch(url);
    const data = await res.json();
    dispalyNews(data.data)
};

const dispalyNews = datas => {
    const mainCard = document.getElementById('main-card');
    datas.forEach(data => {
        console.log(data)
        const div = document.createElement('div');
        div.classList.add('col-lg-12');
        div.innerHTML = `
        <div class="card mb-3" style="max-width: 1040px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${data.image_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${data.title}</h5>
              <p class="card-text">${data.details}</p>
              

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
                
              </div>

            </div>
          </div>
        </div>
      </div>
        `;
        mainCard.appendChild(div)
    })
}

loadNews()