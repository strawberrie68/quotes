const router = require('express').Router();
let Book = require('../models/bookModel')
let Quote = require('../models/quoteModel')

router.route('/').get((req, res) => {
    Book.find()
        .populate("quote")
        .then(books => res.json(books))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req, res) => {
    Book.findById(req.params.id)
        .populate("quote")
        .then(book => res.json(book))
        .catch(err => res.status(404).json({ nobookfound: 'No Book found'}))
})

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const description = req.body.description;
    const bookImg = req.body.bookImg;
    const tag = req.body.tag;
    const fav = req.body.fav;
    const genre = req.body.genre
    const isFinishedReading = req.body.isFinishedReading;

    const newBook = new Book({
        title, author, description, bookImg, tag, fav, isFinishedReading,genre
    })

    newBook.save()
        .then(() => res.json('Book added'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').post((req, res) => {
    Quote.create(req.body)
    .then(function(dbQuotes) {
        return Book.findOneAndUpdate({ _id: req.params.id }, 
                                     { $push: {quote: dbQuotes._id}},
                                     { upsert: true })
    })
    .then(function(dbBook) {
        res.json(dbBook)
    })
    .catch(err => res.json(err))
})

router.route('/:id').delete((req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .then(() => res.json('Book deleted'))
        .catch(err => res.status(400).json('Error: ' + err ))
})


router.put('/update/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body)
      .then(book => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  });

router.route('/:id').delete((req,res) => {
    Book.findByIdAndDelete(req.params.id)
        .then(() => res.json('Book deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})
//review please





module.exports = router