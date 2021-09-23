const fs = require("fs");
const path = require("path");

const { Book } = require("../models/book.model");

const getAll = function (req, res) {
    fs.readFile( path.join(__dirname , "../list.json"), function (err,data){
        if(!err){
            const books = JSON.parse(data).books;

            var livres = [];

            for(let i = 0; i<books.length; i ++){
                var livre = Book.fromJson(books[i]);
                livres.push(livre);
            }
            res.render("list", {livres : livres })
        }
    });
}


const getBookById = function (req, res) {
    const id = req.params.book_id;

    fs.readFile( path.join(__dirname , "../list.json"), function (err,data){
        if(!err){
            const books = JSON.parse(data).books;

            const livre = books.find(function(el){
                return el.id == id;
            });

            res.render("book", {livre : new Book.fromJson(livre) })
        }
    });
}

module.exports.getBooks = getAll;
module.exports.getBookById = getBookById;