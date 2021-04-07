const renderMainServerPage = (_req, res) => {
  res.render('index', { title: 'Guest-Book Back-End' })
}

const renderCommentsServerPage = (Model) => async (_req, res) => {
    try {
      const comments = await Model.find({}).lean()
      const options = {
        title: 'Guest-Book Comments',
        comments
      }
      res.render('comments', options)
    } catch (err) {
        next(err)
        // res.status(400).send(err);
        // return console.error(err);
    }
}

module.exports = {renderMainServerPage, renderCommentsServerPage}