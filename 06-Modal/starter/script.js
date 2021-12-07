'use strict';

const modal=document.querySelector('.modal');
const overlay=document.querySelector('.overlay');
const opnbtn=document.querySelectorAll('.show-modal')
const clsbtn=document.querySelector('.close-modal');


const openmodal=()=>{
    console.log(opnbtn);
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

for(var i=0;i<opnbtn.length;i++){
opnbtn[i].addEventListener('click',openmodal)
}

const closemodal=()=>{
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

clsbtn.addEventListener('click',closemodal)
overlay.addEventListener('click',closemodal)

// document.addEventListener('keydown',closemodal) // will close by pressing any key

document.addEventListener('keydown', (e)=>{
    console.log(e.key)
    if(!modal.classList.contains('hidden') && e.key==='Escape'){
        closemodal()
    }else{
        return
    }
})