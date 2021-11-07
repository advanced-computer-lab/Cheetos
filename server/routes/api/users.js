const express = require('express');
const router = express.Router();

// Load User model
const User = require('../../models/Flight');

// @route GET api/users/test
// @description tests users route
// @access Public
router.get('/test', (req, res) => res.send('user route testing!'));

// @route GET api/users
// @description Get all users
// @access Public
router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
});

// @route GET api/users/:id
// @description Get single user by id
// @access Public
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nouserfound: 'No User found' }));
});

// @route GET api/users
// @description add/save book
// @access Public
router.post('/', (req, res) => {
  User.create(req.body)
    .then(user => res.json({ msg: 'User added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this user' }));
});

// @route GET api/users/:id
// @description Update book
// @access Public
/*router.put('/update', (req, res) => {
  Flight.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json({ msg: 'Updated successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to update the Database' })
    );
});*/

// @route GET api/users/:id
// @description Delete book by id
// @access Public
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, req.body)
    .then(user => res.json({ mgs: 'User entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a user' }));
});


module.exports = router;
