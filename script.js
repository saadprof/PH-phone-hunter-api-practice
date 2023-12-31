//  Load Data
const loadPhoneData = async (searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhoneData(phones);
}

//  Display Data
const displayPhoneData = (phones) =>{
    // console.log(phones);
    
    const phonesContainer = document.getElementById("phone-cards-container");
    phonesContainer.innerHTML = '';

    
    // Part of show more button function
    // const showMoreBtn = document.getElementById("show-all-btn");
    // if(phones.length > 6) showMoreBtn.classList.remove("hidden");
    // if(phones.length <= 6) showMoreBtn.classList.add("hidden");


    phones.forEach(phone =>{
        // console.log(phone);

        const phoneDiv = document.createElement("div");
        phoneDiv.classList = 'bg-white drop-shadow-lg border rounded-lg';

        phoneDiv.innerHTML = `
        <div class="p-4">
            <div class="bg-pink-50 rounded-lg">
                <img class="p-4 mx-auto rounded-lg" src="${phone.image}" alt="" />
            </div>
            <h3 class="text-2xl text-pink-500 font-bold mt-3">${phone.phone_name}</h3>
            <p class="text-pink-400 my-2">
                There are many variations of passages of available, but the
                majority have suffered
            </p>
            <div><button onclick="loadPhoneDetails('${phone.slug}'); my_modal.showModal()" class="btn bg-white border-pink-400 text-pink-500 font-bold">Show Details</button></div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    loader(false);
}



//  Load phone details in modal
const loadPhoneDetails = async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phoneDetails = data.data;
    displayPhoneDetails(phoneDetails);
}

//  Display phone details in modal
const displayPhoneDetails = (phoneDetails) =>{
    // console.log(phoneDetails);

    const phoneDetailsContainer = document.getElementById("phone-details-container");
    phoneDetailsContainer.innerHTML = `
    <div>
        <h3 class="text-2xl font-bold">${phoneDetails.name}</h3>
        <p class="mt-1 text-sm opacity-80">${phoneDetails.releaseDate ? phoneDetails.releaseDate : "Date is Not Available"}</p>
    </div>
    <hr class="my-3">
    <div class="bg-pink-50 rounded-lg">
        <img class="mx-auto p-2" src="${phoneDetails.image}" alt="Phone Image" />
    </div>

    <div class="my-4">
        <p class="text-lg font-bold">Chipset: <span class="text-normal font-normal">${phoneDetails.mainFeatures.chipSet ? phoneDetails.mainFeatures.chipSet : "Not Available"}</span></p>
        <p class="text-lg font-bold">Display: <span class="text-normal font-normal">${phoneDetails.mainFeatures.displaySize ? phoneDetails.mainFeatures.displaySize : "Not Available"}</span></p>
        <p class="text-lg font-bold">Memory: <span class="text-normal font-normal">${phoneDetails.mainFeatures.memory ? phoneDetails.mainFeatures.memory : "Not Available"}</span></p>
        
        <!--Sensors-->
        <div class="flex gap-8 my-2">
            <p class="text-lg font-bold">Sensors: </p>
            <ol id="sensor-container" class="list-disc text-normal font-normal">

            </ol>
        </div>

        <!--Others-->
        <div class="flex gap-8 my-2">
            <p class="text-lg font-bold">Others: </p>
            <ol id="connectivity-container" class="list-disc text-normal font-normal">

            </ol>
        </div>
    </div>
    `;

    // Sensors from array
    const sensorContainer = phoneDetailsContainer.querySelector("#sensor-container");
    phoneDetails.mainFeatures.sensors.forEach(sensor =>{
        const sensorList = document.createElement("li");
        sensorList.innerText = `${sensor}`;
        sensorContainer.appendChild(sensorList);
    });

    // Connectivity components
    const connectivityContainer = phoneDetailsContainer.querySelector("#connectivity-container");
    const components = phoneDetails?.others;
    for(const component in components){
        // console.log(`${component}: ${components[component]}`);
        const componentList = document.createElement("li");
        componentList.innerText = `${component}: ${components[component]}`;
        connectivityContainer.appendChild(componentList)
    }
}



//  Searching phones by clicking button
const searchPhone = () =>{
    const searchField = document.getElementById("search-text-field");
    const searchText = searchField.value;

    loader(true);
    if(searchText === ''){
        alert("Plese give some input");
        loader(false);
    };
    if(searchText !== '') loadPhoneData(searchText, );
    
    searchField.value = '';
}

const searchPhoneEnter = (event) =>{
    if(event.key == "Enter"){
        const searchField = document.getElementById("search-text-field");
        const searchText = searchField.value;
    
        loader(true);
        if(searchText === ''){
            alert("Plese give some input");
            loader(false);
        };
        if(searchText !== '') loadPhoneData(searchText, );
        
        searchField.value = '';
    }
}


// Loading function
const loader = (isLoading) =>{
    const loader = document.getElementById("loader");

    if(!isLoading) loader.classList.add("hidden"); 
    if(isLoading) loader.classList.remove("hidden"); 
}





loadPhoneData("iphone");