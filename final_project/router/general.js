const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}


public_users.post("/register", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  let p = new Promise((resolve,reject)=>{
    resolve(res.send(JSON.stringify(books,null,4)));
  });

  p.then(()=>{
    console.log("Task 10");
  });  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {  
  const isbn = req.params.isbn;
  let filteredBooks = books.filter((book) => book.isbn === isbn);
  let p = new Promise((resolve,reject)=>{
    resolve(res.send(filteredBooks));
  });
  
  p.then(()=>{
    console.log("Task 11");
  })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  
  const author = req.params.author;
  let filteredBooks = books.filter((book) => book.author === author);
  let p = new Promise((resolve,reject)=>{
    resolve(res.send(filteredBooks));
  });
  
  p.then(()=>{
    console.log("Task 12");
  })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  
  const title = req.params.title;
  let filteredBooks = books.filter((book) => book.title === title);
  let p = new Promise((resolve,reject)=>{
    resolve(res.send(filteredBooks));
  });
  
  p.then(()=>{
    console.log("Task 13");
  })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const isbn = req.params.isbn;
  let filteredBooks = books.filter((book) => book.isbn === isbn);
  res.send(filteredBooks);
});

module.exports.general = public_users;
