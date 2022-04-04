const { User } = require('../models');
const { modelName } = require('../models/Thoughts');

module.exports = {
    getUsers(req, res) {
        User.find()
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(500).json(err))
    }
}