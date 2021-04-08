const { CommentModel } = require('../models/models')

const handlerReturn = (result, successCode = 200) => ({
    code: result ? successCode : 404,
    data: result ? result : { status: "error", message: "Not found" }
})

const handlerMongoGetAll = async (Model) => {
    const result = await Model.find({})
    return handlerReturn(result)
}

const handlerMongoGetById = async (Model, req) => {
    const result = await Model.findOne({ _id: req.params.id })
    return handlerReturn(result)
}

const handlerMongoPost = async (Model, req) => {
    const result = await Model.create(req.body);
    return handlerReturn(result, 201)
}

const handlerMongoDelete = async (Model, req) => {
    const result = await Model.findOneAndRemove({ _id: req.params.id })
    return handlerReturn(result)
}

const handlerMongoPatch = async (Model, req) => {
    const result = await Model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    return handlerReturn(result)
}

const controller = (handlerMongo, Model) => async (req, res, next) => {
    try {
        const { code, data } = await handlerMongo(Model, req)
        return res.status(code).send(data);
    } catch (err) {
        next(err)
    }
}

const getDataMongo = controller(handlerMongoGetAll, CommentModel)
const getByIdDataMongo = controller(handlerMongoGetById, CommentModel)
const postDataMongo = controller(handlerMongoPost, CommentModel)
const deleteDataMongo = controller(handlerMongoDelete, CommentModel)
const patchDataMongo = controller(handlerMongoPatch, CommentModel)

module.exports = {getDataMongo, getByIdDataMongo, postDataMongo, deleteDataMongo, patchDataMongo}