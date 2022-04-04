const { Schema, model } = require('mongoose');

const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: () => new Date
        }
    }
)





const Thoughts = model('thoughts', ThoughtsSchema);


module.exports = Thoughts;