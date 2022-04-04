const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        
    }
)

const Thoughts = model('thoughts', ThoughtsSchema);

module.exports = Thoughts;