// const express = require('express');
// const MongoClient = require('mongodb').MongoClient;

// const app =express();

// MongoClient.connect("mongodb://localhost:27017/",function(err,client){

// if(err)
// {
//     console.log(err)

// }
// console.log("connected Mongo db");
// client.close()
// })

let details = {
    fName :"abc",
    age :26
}

let details2= {
    fName :"a",
    age :22
}

let helper = function(place , gender)
{
   
    console.log(this.fName+" " +this.age + place + " " +gender);

}

helper.call(details,"sulthan","M");
helper.apply(details2,["s","F"])
let bindExample = helper.bind(details,"s","a")
bindExample()

function multiple(x,y)
{
    return x+y;
}

let multipletwo = multiple.bind(this,2);


console.log(multipletwo(5))



