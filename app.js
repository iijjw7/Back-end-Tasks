const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json()); // create the middleware

const readData = () => {
    const data = fs.readFileSync('users.json');
    return JSON.parse(data);
}

// EndPoints for get and getById:

// get all users
app.get('/users', (req, res) => {
    const users = readData();
    res.json(users);
});

// getById endpoint
app.get('/users/:id', (req, res) => {
    const users = readData();
    const user = users.find(u => u.id == parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

// get users by hobby
app.get('/users/hobby/:hobby', (req, res) => {
    const users = readData();
    const hobby = req.params.hobby;
    const usersWithHobby = users.filter(u => u.hobbies && u.hobbies.includes(hobby));
    if (usersWithHobby.length === 0) return res.status(404).json({ error: 'No users found with that hobby' });
    res.json(usersWithHobby);
});

app.listen(port, function () {
    console.log('My server is running here: http://localhost:3000');
});
