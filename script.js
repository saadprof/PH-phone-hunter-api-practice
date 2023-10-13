//  Load Data
const loadPhoneData = async () =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`);
    const data = await res.json();
    const phones = data.data;
    displayPhoneData(phones);
}


//  Display Data
const displayPhoneData = (phones) =>{
    // console.log(phones);
    
    const phonesContainer = document.getElementById("phone-cards-container");

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
    })
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
    console.log(phoneDetails);

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
        
        <div class="flex gap-8 my-2">
            <p class="text-lg font-bold">Sensors: </p>
            <ol id="sensor-container" class="list-disc text-normal font-normal">

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
}

loadPhoneData();