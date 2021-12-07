'use strict';


// document.querySelector('#score1').textContent=44

//user-rolls dice
const score1 = document.getElementById('score1')
const score2 = document.getElementById('score2')
const curr1 = document.getElementById('current1')
const curr2 = document.getElementById('current2')

const btnNew = document.querySelector('.btn--new')
const dice = document.querySelector('.dice')
const btnhold = document.querySelector('.btn--hold')

var turn = false;
var random = 0;
var scores = [0, 0]

let score = 0;
let active = 1;
let playing=true;
const switchplayer = () => {
    document.getElementById(`current${active}`).textContent = 0;
    active = active === 1 ? 2 : 1;
    score = 0;
    document.querySelector('.player1').classList.toggle('player--active')
    document.querySelector('.player2').classList.toggle('player--active')
}

const diceroller = () => {
    if(playing){
    random = Math.trunc(Math.random() * 6) + 1;
    console.log(random)
    //better option

    dice.src = `dice-${random}.png`

    //usual alt
    // switch(random){
    //     case 1: dice.src='dice-1.png';
    //             break;
    //     case 2: dice.src='dice-2.png';
    //             break;
    //     case 3: dice.src='dice-3.png';
    //             break;
    //     case 4: dice.src='dice-4.png';
    //             break;
    //     case 5: dice.src='dice-5.png';
    //             break;
    //     case 6: dice.src='dice-6.png';
    //             break;
    // }

    if (random !== 1) {
        score += random
        console.log(score)
        // scores[0]=score;
        // curr1.textContent=score
        document.getElementById(`current${active}`).textContent = score;
    } else {
        switchplayer()

    }
    }
}
//to roll dice
document.querySelector('.btn--roll').addEventListener('click', diceroller)



// to hold score
btnhold.addEventListener('click', () => {
    if(playing){
    scores[active - 1] += score;

    document.getElementById(`score${active}`).textContent = scores[active - 1];

    if (scores[active - 1] >= 100) {
        playing=false;
        document.querySelector(`.player${active}`).classList.add('player--winner')
        document.querySelector(`.player${active}`).classList.remove('player--active')

    } else {
        switchplayer()
    }
}
})

// to reset game
btnNew.addEventListener('click',()=>{
    active=1;
    score1.textContent=0;
    score2.textContent=0;
    curr1.textContent=0;
    curr2.textContent=0

    document.querySelector('.player1').classList.add('player--active')
    document.querySelector('.player1').classList.remove('player--winner')
    document.querySelector('.player2').classList.remove('player--winner')
    document.querySelector('.player2').classList.remove('player--active')

    scores=[0,0]
    playing=true;


})
