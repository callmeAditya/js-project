'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
// Section-11
// // Data
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

//Section-12

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];



// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const invalidlogin = document.querySelector('.modal')
const closemodal = document.querySelector('.close-modal')
const overlaymodal = document.querySelector('.overlay')

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const btnNormal = document.querySelector('.btn--normal');

const login = document.querySelector('.login__input')
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort=false) {

  const sortMov=sort ? movements.slice().sort((a,b)=>a-b): movements 
  containerMovements.innerHTML = '' // remove 3 days ago tags
  sortMov.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `   
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
                   <div class="movements__value--${type}">${mov}</div>
                    </div>
      
    `

    containerMovements.insertAdjacentHTML('afterbegin', html);

  });
}

//balance-summary

const displayBalance = function (acc) {
  const balance = acc.movements.reduce((accum, curr) => accum + curr, 0)
  acc.balance=balance;
  labelBalance.textContent = '€' + acc.balance
}

// deposit summary
const depositSummary = function (movements) {
  const value_in = movements.filter(mov => mov > 0).reduce((accum, mov) => accum + mov, 0)
  labelSumIn.textContent = '€' + value_in
}
//withdrawal summary
const withdrawalSummary = function (acc) {
  const movements = acc.movements
  const value_out = movements.filter(mov => mov < 0).reduce((accum, mov) => accum + mov, 0)
  labelSumOut.textContent = '€' + Math.abs(value_out)
}

//interest

const interest = function (acc) {
  const movements = acc.movements
  const inst = movements.filter(mov => mov > 0)
    .map((mov) => (mov * acc.interestRate) / 100)
    .filter(mov => mov >= 1)           // deposit must be greater than 1
    .reduce((sum, mov) => sum + mov, 0)

  labelSumInterest.textContent = '€' + inst.toFixed(3)

}



//methods

const updateUI=function(user){
 // diplay movements
 displayMovements(user.movements)

 //display balance
 displayBalance(user)

 //display summary
 depositSummary(user.movements)

 //withdrawal
 withdrawalSummary(user)

 //interest summary
 interest(user)
}



//event handlers

let user,timer;
let insidelogin = false;




//LOGOUT TIMER
const startLogOut= function(){
 

  const tick=function(){

    const min= Math.trunc(time/60);
    const sec= time%60;


    labelTimer.textContent=`${min}:${sec}`


    //after 0 sec
    if(time===0)
    {
      clearInterval(timer)
      labelWelcome.textContent="Login to get Started"
      // containerApp.style.display="none";
      containerApp.style.opacity=0;
    }
    time--;
  }
  let time=10;
  tick()
   timer=setInterval(tick,1000)
  return timer
  }


//LOGIN
btnLogin.addEventListener('click', function (e) {
  e.preventDefault()
  console.log('Login');
  user = accounts.find(acc => acc.username === inputLoginUsername.value)
  console.log(user);
  if (user?.pin === Number(inputLoginPin.value)) {
    console.log(user.pin);
    insidelogin = true;
    //clear username and password input 
    inputLoginPin.value = inputLoginUsername.value = ''
    inputCloseUsername.value=inputClosePin.value=''
    inputLoginPin.blur()
    //welcome screen
    labelWelcome.textContent = `Welcome, ${user.owner}`
    containerApp.style.opacity = 100;

    // inputLoginUsername.classList.add('hidden')
    // inputLoginPin.classList.add('hidden')
    // btnLogin.textContent='Log-Out'

    // btnLogin.addEventListener('click', function(e){
    //   inputLoginUsername.classList.remove('hidden')
    //   inputLoginPin.classList.remove('hidden')
    //   btnLogin.textContent='Login'
    //   labelWelcome.textContent='Login to get started'
    //   containerApp.style.opacity=0;
    //   inputLoginPin.value= inputLoginUsername.value=''
    // })

  } else {
    invalidlogin.classList.remove('hidden')
    overlaymodal.classList.remove('hidden')
    closemodal.addEventListener('click', function () {
      invalidlogin.classList.add('hidden')
      overlaymodal.classList.add('hidden')
    })
    console.log('invalid');
  }


if(timer) clearInterval(timer)
timer=startLogOut()

  updateUI(user)
 
})// login btn ends


//TRANSFER AMOUNT
let depositTo
btnTransfer.addEventListener('click', function(e){
e.preventDefault() // to stop reloading of image
const amount= Number(inputTransferAmount.value)  
const transferto=inputTransferTo.value
// console.log(amount,transferto);

//to erase values in transfer
inputTransferAmount.value=inputTransferTo.value=''


let value=0;
 depositTo=accounts.find(acc=> acc.username===transferto) //beneficiar user
 if(amount>0 && depositTo && user.balance>amount && depositTo.username!==user.username){
   //doing the transfer
  user.movements.push(-amount)
  depositTo.movements.push(amount)

  //update ui
  updateUI(user)

 
  
 }
// console.log(depositTo);

})



//REQUEST LOAN
btnLoan.addEventListener('click', function(e){
e.preventDefault() // stops reloading
   const amount= Number(inputLoanAmount.value)

   if(amount> 0 && user.movements.some(mov=> mov> 0.1*amount)){
    
    setTimeout(function(){
    user.movements.push(amount)

     updateUI(user)

     //reset timer
     clearInterval(timer)
     timer=startLogOut()
    },2500)
   }else{
     alert('Amount is greater than requested!')
   }

   inputLoanAmount.value=''
})



//CLOSE ACCOUNT
btnClose.addEventListener('click',function(e){
e.preventDefault() // stop reload screen
// console.log('delete');

if(user.username===inputCloseUsername.value && user.pin===Number(inputClosePin.value) )
  {
    const deleteuser= accounts.findIndex(acc=> acc.username===user.username);
    console.log(deleteuser);
      accounts.splice(deleteuser,1)// delete at that index and remove '1' item;

    // alert('User is Deleted!')

      //hide ui
      containerApp.style.opacity=0;
      

      //top of the screen
      window.scrollTo({top:0,behavior:'smooth'})
  }
  inputCloseUsername.value=inputClosePin.value=''
})


//SORT accounts

btnSort.addEventListener('click', function(e){
  e.preventDefault() // stop reloading
  displayMovements(user.movements, true)
btnSort.classList.add('hidden')
btnNormal.classList.remove('hidden')

  
})
btnNormal.addEventListener('click',function(e){
  e.preventDefault()
  displayMovements(user.movements,false)
  btnSort.classList.remove('hidden')
  btnNormal.classList.add('hidden')
  
})



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300, 7550];

/////////////////////////////////////////////////


const movementsDollar = movements.map((ele, i) => {
  return Number((ele * 1.16).toFixed(2));
})

console.log(movementsDollar)


const createUsers = function (accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('')
  })
}
createUsers(accounts)
// console.log(accounts)


// const deposits= movements.filter((mov)=>{
//   return mov>0
// })

// console.log(deposits);

const balance = movements.reduce(function (accum, curr, i, arr) {
  if (accum < curr) {
    accum = curr
  }
  return accum;

}, movements[0])

console.log(balance);


const accmov= accounts.map(acc=>acc.movements)
const allmov= accmov.flat()
const overall= allmov.reduce((accum,mov)=>accum+mov,0);

// console.log(accmov);
console.log(overall);

const overall2= accounts.flatMap(acc=>acc.movements).reduce((acc,mov)=>acc+mov,0)
console.log(overall2
  );
