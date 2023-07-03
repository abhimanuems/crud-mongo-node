// // function getData()
// // {
// //  return new Promise((res,rej)=>{



// // setTimeout(()=>{
// //     res(100)
// // },1000)
    
// //  })
// // }




// // async function getName()
// // {
// //     let a  = await getData();
// //     console.log(a)
// // }

// // getName()


// const numbers =[1,2,3,4,5,6];

// var count =0 ;





// function sum (value){

//     count +=value;
    
    

// }

// numbers.forEach(sum)
// console.log(count)

// const letters = new Set();

// letters.add(20)
// letters.add(39)
// letters.delete(20)
// console.log(letters.has(20))

// console.log(letters)

// letters.forEach((value)=>{
//     console.log(value)
// })


// let string = 'abcdef';

// let newStrig = string.slice(1,3)
// console.log(newStrig)


// let arr =[1,2,3,4,5,6,7];

// let result = arr.map((value)=> value*2);

// let filter = arr.filter((x)=> x%2==0)

// let reduuce =arr.reduce((acc,value)=>{

//     acc= acc+ value;
//     return acc


// });

// console.log(reduuce)

// let obj ={
//     name:"a",
//     age:20
// }
// Object.freeze(obj)

// obj.name="hello"
// console.log(obj.name)


// function  callbackExample(callback)
// {
//     callback();

// }

// function sample ()
// {
//     console.log("example of call back");
// }

// callbackExample(sample);



// function fetchData()
// {

//     return new Promise((resolve,reject)=>{

//         setTimeout(()=>{
//             const data = "100";
//             resolve(data);
//         },3000);
//     })
// }

// fetchData().then((data)=>{
//     console.log(data);
// }).catch((err)=>console.log(err))


// const cart = [];

// let promise = createOrder(cart);

// function createOrder(cart)
// {
//     return new Promise((resolve,reject)=>{

//         const orrderId = 1;
//         if(cart.length==0)
//         {
//             const err = new Error("cart empty");
//             reject(err);
//         }  else if (orrderId)
//         {
//             resolve(orrderId)
//         }
//     })
// }

// promise.then((data)=> console.log(data)).catch((err)=>console.log(err))


// let sample =async function sample()
// {

//  return function ()
//  {
//      setTimeout(()=>{
//         return "example async"
//      },1000)
//  }




// }
//  sample().then((data)=>console.log(data))
// .catch((err)=>console.log(err))


// const arr = [1,2,3,4,5,6,7,8];
// const output = arr.slice();
// console.log(output)

// function promise()
// {
//     return new Promise((resolve,reject)=>{

//         setTimeout(()=> resolve("resolved"),1000);
//     })
// }

// async function aynscCall()
// {
//     let result = await promise();
//     console.log(result)
// }

// aynscCall();

// promise().then((res)=>console.log(res));


// function sum(a,b)
// {
//     let acc = a+b ;
//     console.log(acc);

// }
// let sumOftwo = sum.bind(this,2);

// sumOftwo(3)


// function multuply(a)
// {
//     return function(b)
//     {
//         console.log(a*b);
//     }
// }

// let multiply = multuply(2);

// multiply(1);


// const { urlencoded } = require('body-parser');
// const express = require('express');
// const session = require('express-session');

// const cred = {
//     user: "abc",
//     pass: "abc"
// };

// const app = express();
// app.set('view engine', 'ejs');

// app.use(express.urlencoded({ extended: true }));


// app.use((req, res, next) => {
//     res.header('Cache-control', 'no-cache,private,no-store,must-revalidate,max-stale=0, post-check=0,pre-check=0');
//     next();
// })




// app.use(session({
//     secret: "abc",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }));


// const isLoggedIn = (req, res, next) => {
//     if (req.session.loggedIn && req.session.user) {
//         next();
//     } else {
//         res.redirect('login');
//     }
// };

// app.get('/login', (req, res) => {
//     if (req.session.loggedIn) {
//         res.render('home');
//     } else {
//         res.render('login', { data: null });
//     }
// });


// app.post('/home', (req, res) => {
//     console.log(req.body);
//     console.log(req.body.user);
//     if (req.body.user == cred.user && req.body.pass === cred.pass) {
//         req.session.loggedIn = true;
//         req.session.user = req.body.user;
//         res.render('home');
//     } else {
//         res.render('login', { data: "invalid credentials" })
//     }
// });

// app.get('/home', isLoggedIn, (req, res) => {
//     if (req.session.user && req.session.user) {
//         res.render('home');
//     } else {
//         res.render('login', { data: "kindly login" });
//     }
// });


// app.get('/logout', (req, res) => {
//     req.session.destroy(function (err) {
//         if (err) {
//             console.log(err);
//             res.end("error");
//         } else {
//             res.render('login', { data: "logout successfull" });
//         }
//     });
// });

// app.listen(2000, () => console.log("port started at 2000"));


// let count = 1, max = 0;
// function maxCount(arr)
// {
   
//     for(let x=0;x<arr.length;x++)
//     {
//         if(arr[x] == 1){
//             count++
//         } else if (max < count) {
           
//                 max=count;
//                 count=1;
            
//         }
//     }
//     return max;
// }

// let arr = [1, 1, 0, 1]
// console.log(maxCount(arr))


// let array = [1,0,2,3,0,4,5,0];
// let length =array.length
// for(let i=0;i<length;i++)
// {
//     if(array[i]===0)
//     {
   
//         array.splice(i+1,0,0)
//         i++;

        
//     }
// }
// console.log(array)

// let ops = ["5","2","C","D","+"];

// let record=[];
// let lastNumber ;

// for(let i in ops)
// {
//     if(record!=null && ops[i]==="C")
//     {
//         record.pop();

//     }
//     else if(record!=null && ops[i]==="D")
//     {
//        lastNumber=2* record[record.length-1]
//        record.push(lastNumber)

//     }
//     else if(record!=null && ops[i]==="+")
//     {
//         lastNumber = record[record.length-1]+record[record.length-2];
//         record.push(lastNumber)
//     }
//    else if((parseInt(ops[i])))
//    {
//     record.push(parseInt(ops[i]));
//    }

// }
// console.log(record)
// let sum=0;
// for(let x in record)
// {
// sum += record[x]
// }
// console.log(sum)

let leetcodeBank =[1];
const n=14;
let sum=0;

for(let i=1;i<=n;i++)
{
   if(i<8)
   {
    sum +=i
   }

    if((Math.floor(i/7) == 1)  && i>7 && i<21 )
   {
  
    sum+=(i%7)+1
   }
   

   if((Math.floor(i/7) == 2)  && i>7 && i<21 )
   {
    if(i%7==0)
   {
    sum+=8
    continue;
   }
    sum+=(i%7)+1
   }


}
console.log(sum)
