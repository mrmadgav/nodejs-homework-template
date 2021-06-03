const notFound = (res, err) => {
  res.status(404).send('This path can\'t found')
  console.error(err)
}

module.exports = notFound
