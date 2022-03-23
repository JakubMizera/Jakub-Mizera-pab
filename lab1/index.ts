const express = require('express')  
const app = express()  
app.get('/', function (req, res) {  
  res.send('hello' + sum)
  req.query.sum
})  
app.listen(3000)  

const num1 = 10;
const num2 = 5;

const sum = num1 + num2;

console.log(num1 * num2);   