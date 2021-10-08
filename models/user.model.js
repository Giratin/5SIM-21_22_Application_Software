
const User = function (id, fname, lname, email, age) {
    this.id = id;
    this.firstName = fname;
    this.lastName = lname;
    this.email = email;
    this.age = age;
};

module.exports = User;