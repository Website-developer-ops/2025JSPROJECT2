
let intro = document.getElementById("introduction");
let adv = document.getElementById("Advantages");
let dis = document.getElementById("Disadvantages");
let BarbellExe = document.getElementById("BarbellExe");

intro.style.display = "none";
adv.style.display = "none";
dis.style.display = "none";
BarbellExe.style.display = "none";

function introduction(){
    if(intro.style.display == "none"){
        intro.style.display = "block";
    }
    else{
        intro.style.display = "none";
    }
}
function advantages(){
    if(adv.style.display == "none"){
        adv.style.display = "block";
    }
    else{
        adv.style.display = "none";
    }
}
function disadvantages(){
    if(dis.style.display == "none"){
        dis.style.display = "block";
    }
    else{
        dis.style.display = "none";
    }
}

function barbellExe(){
    if(BarbellExe.style.display == "none"){
        BarbellExe.style.display = "block";
    }
    else{
        BarbellExe.style.display = "none";
    }
}

