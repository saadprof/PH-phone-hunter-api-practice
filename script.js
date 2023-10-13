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
        console.log(phone);

        const phoneDiv = document.createElement("div");
        phoneDiv.classList = 'bg-white drop-shadow-lg border';

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
            <div><button class="btn bg-white border-pink-400 text-pink-500 font-bold">Show Details</button></div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })
}

loadPhoneData();