var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.send('hello' + sum);
    req.query.sum;
});
app.listen(3000);
var num1 = 10;
var num2 = 5;
var sum = num1 + num2;
console.log(num1 * num2);
