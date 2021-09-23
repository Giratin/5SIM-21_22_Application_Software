const { title } = require("process");

const Book = function (
    id, title, pages, date, image,
    description, author, categories
){
    this.id = id;
    this.title = title;
    this.pageCount = pages;
    this.date = date;
    this.image = image;
    this.description = description;
    this.author = author;
    this.categories = categories;
}

Book.fromJson = function (object) {
    return new Book(
        object.id,
        object.title,
        object.pageCount,
        new Date(object.publishedDate.date),
        object.thumbnailUrl,
        object.longDescription,
        object.authors.join(" - "),
        object.categories.join(" - ")
    )
}

module.exports.Book = Book;