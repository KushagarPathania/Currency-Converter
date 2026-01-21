
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".message");
for(let select of dropdowns){
    for(currcode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        if(select.name==="from" && currcode==="USD"){
            newoption.selected="selected";
        }else if(select.name==="to" && currcode==="INR"){
            newoption.selected="selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
}
const updateflag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
}
window.addEventListener("load",()=>{
    updateExchangeRate();

})

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    

})
let updateExchangeRate=async ()=>{
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval==="" || amtval<1){
        amtval=1;
        amount.value="1";
    }
    const base_url=`https://api.frankfurter.app/latest?from=${fromcurr.value}&to=${tocurr.value}`;
    let response= await fetch(base_url);
    let data=await response.json();
    let Rate=data.rates[tocurr.value];
    let finalamount=amtval*Rate;
    msg.innerText=`${amtval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`
}