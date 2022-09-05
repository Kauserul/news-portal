
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
            <a onclick="loadCategoryDetails('${cetagory.category_id}')" class="nav-link me-4 ms-3 text-dark" href="#">${cetagory.category_name}</a>
        `
        topNav.appendChild(navBarMenu)
    }
};

const loadCategoryDetails = (id)=>{
    // console.log(id)
    // lodar start
    const lodar = document.getElementById('spinner');

    lodar.classList.remove('d-none')
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => displayCetagoryDetails(data.data))
        .catch(error => displayCetagoryDetails(error))
};

const displayCetagoryDetails = details =>{
    // console.log(details);

    // lodar end
    const lodar = document.getElementById('spinner');
    lodar.classList.add('d-none')

    const inputLength = document.getElementById('total-length');
    if(details.length > 0){
        const totalLength = details.length;
        inputLength.innerText = totalLength;
    }
    

    const displayNews = document.getElementById('display-news');
    displayNews.textContent = '';
    for(const detail of details){
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card', 'mb-3')
        newsDiv.innerHTML =`
        <div class="col-lg-12 col-12">
                    <div class="row">
                        <div class="col-lg-3 col-12 col-md-12 d-flex pb-3 ">
                            <img class="mx-auto"  src="${detail.thumbnail_url}" alt="" >
                        </div>

                        <div class="col-lg-9 p-4">

                              <h4 class="card-title">${detail.title}</h4>
                                 <p class="card-text my-3">${detail.details.slice(0, 4450) + ' ' + 'more.....'}</p>

                            
                                 <div class="row d-flex align-items-center justify-content-center ">
                                       <div class="col-md-4 d-block align-items-center"">
                                     <img  class="w-25 rounded-circle me-3 mx-auto pb-2" src="${detail.author.img}" alt="">
                                 <div>
                                     <h6>${detail.author.name ? detail.author.name : 'NO Name Found'}</h6>
                                    <p class= "py-2"> ${detail.author.published_date ? detail.author.published_date : 'NO Date Found'}</p>
                                        </div>
                       
                                     </div>
                                         <div class="col-md-3 d-flex ">
                                          <h5 class='mx-2 class= "py-2"' ><i class="fas fa-regular fa-eye"></i></h5>
                                         <h5 > ${detail.total_view ? detail.total_view : 'not view'}</h5>
                                 </div>
                                <div class="col-lg-3 col-sm-12 d-flex py-2">
                                   <h5><i class="fas fa-solid fa-star"></i></h5>
                                   <h5><i class="fas fa-solid fa-star"></i></h5>
                                   <h5><i class="fas fa-solid fa-star"></i></h5>
                                   <h5><i class="fas fa-regular fa-star"></i></h5>
                                   <h5><i class="fas fa-regular fa-star"></i></h5>
                                </div>

                                 <div class="col-lg-2 d-flex">         
                                 
                                   <button type="button" onclick="modalDetails('${detail._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                   more view</button>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
        `;
        displayNews.appendChild(newsDiv)
    }

}

const modalDetails = id =>{
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
        .then(res => res.json())
        .then(data => displayModalDetails(data))
        .catch(error => displayModalDetails(error))
}

const displayModalDetails = details =>{
    const modal = document.getElementById('exampleModalLabel');
    modal.innerHTML = ''

    try {
        const creatediv = document.createElement('div');

        creatediv.innerHTML = `
                            <div class="row">
                                 <div class="col-lg-12">
                                         <img class="w-100"  src="${details.data[0].image_url}" alt="" >
                                         <h1 class="card-text my-3">${details.data[0].title}</h1>
                                         <p class = 'text'>${details.data[0].details.slice(0, 250) + ' ' + 'more.....'}</p>
                                         <h5 h5 > ${details.data[0].author.published_date ? details.data[0].author.published_date : 'No published Date'}</h5 >
                                         <div class= "d-flex align-items-center justify-content-center ">
                                           <div class = "mx-auto">
                                           <img class="w-25 rounded-circle my-2 d-block"  src="${details.data[0].author.img}" alt="" >
                                           <p class = 'text '>${details.data[0].author.name ? details.data[0].author.name : 'No author Name!'}</p>
                                           </div>
                                         </div>
                                         </div>
                                         <div class="col-md-3 d-flex ">
                                          <h5 class='mx-2 class= "py-2"' ><i class="fas fa-regular fa-eye"></i></h5>
                                         <h5 > ${details.data[0].total_view ? details.data[0].total_view : 'not view'}</h5>
                                 </div>
                             </div>
                             </div>
     `;
        modal.appendChild(creatediv);

    } catch (err) {
        console.log(err)
    }
}

loadCategoryDetails()
loadMenuBar()