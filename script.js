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

    phones.forEach(phone =>{
        console.log(phone);
    })
}

loadPhoneData();