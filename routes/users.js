import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

//MOCK DATABASE
let users = [
    {
        first_name: 'John',
        last_name: 'Wayne',
        email: 'johnwayne@gmail.com',
    },
    {
        first_name: 'Mary',
        last_name: 'McCarthy',
        email: 'marym@gmail.com',
    },
];

//Getting a list of users from mock database
router.get('/', (req, res) => {
    res.send(users);
});

//Getting a user by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === id);
    res.send(foundUser);

});

//adding users to mock database
router.post('/', (req, res) => {
    const user = req.body;
    users.push({ user, id: uuidv4() });
    res.send(`${user.first_name} has been added to database`);
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email } = req.body;
    const user = users.filter((user) => user.id === id)

    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (email) user.email = email;

    res.send(`user with id ${id} has been updated`);


});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    users = users.filter((user) => user.id !== id)

    res.send(`${id} has been deleted successfully`);

});

export default router