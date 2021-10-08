const User = require("../models/user.model");

var users = [
    {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@esprit.tn",
        "age": 24
    },
    {
        "id": 2,
        "firstName": "John 2",
        "lastName": "Doe 2",
        "email": "john.doe.2@esprit.tn",
        "age": 34
    },
    {
        "id": 3,
        "firstName": "John 3",
        "lastName": "Doe 3",
        "email": "john.doe.3@esprit.tn",
        "age": 44
    }
];


const inrementId = () => {
    let id = 1;
    if (users.length > 0) {
        id = users[users.length - 1].id;
        id++;
    }
    return id;
    // return users[users.length -1] ? users[users.length -1].id ++ : 1;
}

module.exports = {
    listUser: (req, res) => {
        res.json(users)
    },
    createUser: (req, res) => {
        const { firstName, lastName, email, age } = req.body;
        const user = new User(inrementId(), firstName, lastName, email, age);
        users.push(user);
        res.json(user);
    },
    updateUser: (req, res) => {
        const { id } = req.params;
        const { firstName, lastName, email, age } = req.body;

        let hasBeenFound = false
        users = users.filter((el) => {
            if (el.id == id) {
                hasBeenFound = true;
                el.firstName = firstName;
                el.lastName = lastName;
                el.email = email;
                el.age = age;
            }
            return true;
        });

        if (hasBeenFound) {
            return res.json({ updated: true })
        }
        res.status(404).json({ updated: false })

    },
    deleteUser: (req, res) => {
        const { id } = req.params;
        const index = users.findIndex((el) => el.id === +id);
        if (index != -1) {
            users.splice(index, 1);
            return res.json({ deleted: true , users })
        }
        return res.status(404).json({ deleted: false, error: "User not found" })
    },
    getUserById: (req, res) => {
        const { id } = req.params;

        const user = users.find((el) => {
            return el.id == id;
        });

        if (user) {
            return res.json(user)
        }

        res.status(404).json({ message: "User not found" });
    }
}