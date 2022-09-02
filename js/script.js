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
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>
        `;
        mainCard.appendChild(div)
    })
}

loadNews()