
// Load data 
const loadAllData = async (dataLimit) => {
    // loader start 
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    try {
        const response = await fetch(url);
        const data = await response.json();
        showData(data.data , dataLimit);
    } catch (error) {
        console.log(error);
    }
}

// Showing all the datas
const showData = (data,dataLimit) => {
    let {tools} = data;
    const btnSort = document.getElementById('btn-sort');
    const showAll = document.getElementById('Show-all');
    if (dataLimit && data.tools.length > 6) {
        tools  = tools.slice(0,6);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
          
    }
    btnSort.addEventListener('click',function(){
        
    })
    //clear all data
    // Show 10 items
    const allCards = document.getElementById('all-cards');
    allCards.innerHTML = ``;
    tools.forEach(singleData => {
        const { image, name, features, published_in, id } = singleData;
        console.log(published_in);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 shadow-lg">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <p class="card-text">
                    <ol>
                    <li>${features[0]? features[0] : "No data found"}</li>
                    <li>${features[1]? features[1] : "No data found"}</li>
                    <li>${features[2]? features[2] : "No data found"}</li>
                    </ol>
                </p>
            </div>
            <div class="card-footer d-flex justify-content-between">
                <div id="name&date">
                <h5>${name}</h5>
                <div class="d-flex align-items-center gap-3">
                <i class="fa-solid fa-calendar-days"></i>
                <p class="mt-3">${published_in}</p>
                </div>
                </div>
                <div id="details">
                <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fetchElementDetails('${id}')" class="btn rounded-circle bg-red-subtle"> <i class="fa-solid fa-arrow-right"></i>
                </button>
                </div>
            </div>
      </div>
        `
        allCards.appendChild(div);
    });

    // stop spinner  loader
    toggleSpinner(false);
}



const fetchElementDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    try {
        const response = await fetch(url);
        const data = await response.json();
        showModals(data.data);
    } catch (error) {
        console.log(error);
    }
}

// Create Modal cards 

const showModals = data => {
    console.log(data);
    // console.log(data.image_link);
    // for (const key in data.features) {
    //     if (data.features.hasOwnProperty.call(data.features, key)) {
    //         feature.push = data.features[key].feature_name;
    //     }
    // }
    const {pricing,description,features} = data;
    const leftDescription = document.getElementById('modal-left-description');
    const basicPrice = document.getElementById('basic-price');
    const basicPlan = document.getElementById('basic-plan');
    const proPrice = document.getElementById('pro-price');
    const proPlan = document.getElementById('pro-plan');
    const contactPrice = document.getElementById('contact-price');
    const contactPlan = document.getElementById('contact-plan');
    const featuresContainer = document.getElementById('feature-container');
    const image = document.getElementById('image');
    const accuracy = document.getElementById('accuracy');
    const question = document.getElementById('question');
    const answer = document.getElementById('answer');
    featuresContainer.innerHTML = '';
    const IntigrationContainer = document.getElementById('intigrations-container')
    IntigrationContainer.innerText = ``;
    leftDescription.innerText=`${description ? description : "no descripttion found"}`;
    if (pricing && pricing != null) {
       for (let index = 0; index < pricing.length; index++) {
        if (index===0) {
            basicPrice.innerText = `${pricing[index].price}`;
            basicPlan.innerText = `${pricing[index].plan}`;
        }
        else if(index===1){
            proPrice.innerText = `${pricing[index].price}`
            proPlan.innerText = `${pricing[index].plan}`
        }
        else{
            contactPrice.innerText = `${pricing[index].price}`
            contactPlan.innerText = `${pricing[index].plan}`
        }
        
       }
    } else {
        basicPrice.innerText = `Not Available`;
        proPrice.innerText = `Not Available`;
        contactPrice.innerText = `Not Available`
    }
    if(data.features && data.features != null){
        featuresContainer.innerHTML +=`
        <ol>
            <li>${data.features[1].feature_name}</li>
            <li>${data.features[2].feature_name}</li>
            <li>${data.features[3].feature_name}</li>
        <ol>
        `
    }
    else{
        featuresContainer.innerHTML = `No data found`;
    }
   if (data.integrations && data.integrations != null) {
    data.integrations.forEach(element=>{
        IntigrationContainer.innerHTML += `
        <li>${element}</li>
        `
    })
   } else {
    IntigrationContainer.innerText = `No data found`;
   }
   if(data.image_link && data.image_link !=null){
   image.src = `${data.image_link[0]}`
   }
   else{
    console.log('Null');
   }
   if (data.accuracy && data.accuracy.score !== null) {
        accuracy.classList.remove('d-none');
        accuracy.innerText = `${((data.accuracy.score)*100) + '% accuracy'}`
   } else {
        accuracy.classList.add('d-none');
   }
   if (data.input_output_examples && data.input_output_examples != null) {
        question.innerText = `${data.input_output_examples
[0].input}`

        // added some
        // number 10 commit 
   } else {
        question.innerText = 'No input examples';
   } 
   if (data.input_output_examples && data.input_output_examples != null) {
        answer.innerText = `${data.input_output_examples
[0].output}`   
   } 
   else{
    answer.innerText = ``;
   }

   

}



const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none'); // showing loader
    }
    else{
        loaderSection.classList.add('d-none');
    }
}


document.getElementById('btn-show-all').addEventListener('click', function(){
    loadAllData();
})

const liList = array =>{
    for (let i = 1; i < array.length; i++) {
        const element = array[i];
        
    }
}




loadAllData(6);