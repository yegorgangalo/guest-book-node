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

const renderMainServerPage = () => async (req, res) => {
  res.render('layouts/main')
}

module.exports = { getDataMongo, postDataMongo, renderMainServerPage }