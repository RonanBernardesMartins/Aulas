function bleh(){
    console.log("Ola")
}
b=document.querySelector("button:nth-child(4)");
b.innerHTML="click"
b.addeventlistener("click",bleh)