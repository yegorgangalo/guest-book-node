const express = require('express')
const router = express.Router()
const { CommentModel } = require('../models/models')

const getDataMongo = (Model) => async (req, res) => {
    try {
        const allData = await Model.find({})
        res.send(allData);
    } catch (err) {
        res.status(400).send(err);
        return console.error(err);
    }
}

const postDataMongo = (Model) => async (req, res) => {
    try {
        const newData = new Model({ ...req.body })
        await newData.save();
        res.status(201).send(newData);
    } catch (err) {
        res.status(400).send(err);
        return console.error(err);
    }
}

const deleteDataMongo = (Model) => async (req, res) => {
    try {
        const deleted = await Model.findOneAndRemove({ _id: req.params.id })
        res.status(200).send(deleted);
    } catch (err) {
        res.status(400).send(err);
        return console.error(err);
    }
}

const patchDataMongo = (Model) => async (req, res) => {
    try {
        const updated = await Model.findOneAndUpdate({ _id: req.params.id }, { ...req.body })
        res.status(200).send(updated);
    } catch (err) {
        res.status(400).send(err);
        return console.error(err);
    }
}

router
    .get('/', getDataMongo(CommentModel))
    .post('/', postDataMongo(CommentModel))

router
    .delete('/:id', deleteDataMongo(CommentModel))
    .patch('/:id', patchDataMongo(CommentModel))

module.exports = router