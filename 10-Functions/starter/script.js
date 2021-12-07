'use strict';


const lufthansa={
    airline: 'Lufthansa',
    code: 'LH',
    bookings:[],

    book: function(flightnum, name){
        console.log(`${name} has booked ${this.airline} of code ${this.code}${flightnum}`);
        this.bookings.push({flight:`${this.code}${flightnum}`,name})
    }

}



lufthansa.book(23,'Adi')

const eurowings={
    airline:' EuroWings',
    code:'EW',
    bookings:[],
}


const book= lufthansa.book;
book.call(eurowings, 45,'Yash')

const bookEW=book.bind(eurowings)
bookEW(48,'Jesse')


lufthansa.planes=300;
// console.log(lufthansa);
lufthansa.buyplane= function(){
    
this.planes++;
console.log(this.planes);
}

document.querySelector('.buy').addEventListener('click', lufthansa.buyplane.bind(lufthansa)) // this keyword binds to lufthansa object


const addtax=( rate, value) => value + value * (rate/100);
// console.log(addtax(100,23));

const addVAT= addtax.bind(undefined,23); // this->null, undefined ; important to have

console.log(addVAT(100));



const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section 😃
    answers: new Array(4).fill(0),

    registerNewAnswer(){

        const answer= Number(
            prompt(`${this.question}\n ${this.options.join('\n')}\n (Write Option Number)`)
        
        );
        // console.log(answer)

        typeof answer==='number' && answer> 0 && answer<this.options.length && this.answers[answer]++

        this.displayResult()    
        this.displayResult('string')    

        },
       displayResult(type='array'){
        if(type==='array')
        {console.log(`Array result: ${this.answers.join('->')}`);
        }else if(type==='string'){
            console.log(`Poll results are: ${this.answers.join(' ')}`);
            // console.log(...this.answers);
        }
       }      
       
}

// poll.registerNewAnswer()

document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll))
// poll.displayResult.call({answers:[5,4,3]},'string')
poll.displayResult.call({answers:[5,4,3]})

