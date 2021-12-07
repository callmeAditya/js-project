'use strict';
// see final folder for final project

var number=Math.trunc((Math.random()*20)+1);
console.log(number)



// document.querySelector('.again').addEventListener('click', function(){
//     document.querySelector('body').style.background='white'
// });

// const score=Number(document.querySelector('.score').textContent)


var score=20;
var highscore=0;

const display= function(message){
    document.querySelector('.message').textContent=message;
}


document.querySelector('.check').addEventListener('click', function(){
    const guess= Number(document.querySelector('.guess').value)  // Number changes data-type of string
    // console.log(guess, typeof guess)
    document.querySelector('.guess').value=''
    if(!guess){
        display('🚫 No number!')
    }
    else if(guess===number){
        if(score>highscore){
            highscore=score;
            score=20;
            
        }
        document.querySelector('.head').textContent="Correct"
        document.querySelector('body').style.background='#60b347'
        document.querySelector('.number').style.width='30%'
        document.querySelector('body').style.color='white'
        display('Right Away! 🥳')
        document.querySelector('.highscore').textContent=highscore;

        return;
    }
    else if(guess!==number){

    }
    else if(guess>number){
        if(score>1){
            display('You Lost 😥')
            return;
        }
        display('📈 too high!')
        score--
        document.querySelector('.score').textContent=score
    }
    else if(guess<number){
        if(score>1){
            display('You Lost 😥')
            return;
        }
        display('📉 too low!')
        score--
        document.querySelector('.score').textContent=score
    }
});


// document.querySelector('.again').addEventListener('click', function(){
//     document.querySelector('body').style.background='white'
// })

document.querySelector('.again').addEventListener('click', function(){
    number=Math.trunc((Math.random()*20)+1);
    document.querySelector('body').style.background='#222'
    document.querySelector('.guess').value=''
    document.querySelector('.score').textContent=score;
    document.querySelector('.highscore').textContent=highscore;
    document.querySelector('.head').textContent='Guess My Number!';
    document.querySelector('.message').textContent='Start Guessing';
    
    document.querySelector('.number').style.width='15rem'
})