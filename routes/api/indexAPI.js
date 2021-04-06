const renderMainServerPage = (req, res) => {
  res.render('index', { title: 'Guest-Book Back-End' })
}

const renderCommentsServerPage = (Model) => async (req, res) => {
    try {
      const comments = await Model.find({}).lean()
      console.log(typeof comments[0]);
      const options = {
        title: 'Guest-Book Comments',
        comments
      }
        res.render('comments', options)
    } catch (err) {
        res.status(400).send(err);
        return console.error(err);
    }
}

module.exports = {renderMainServerPage, renderCommentsServerPage}