const router = require('express').Router();
let Quote = require('../models/quoteModel')

router.route('/').get((req, res) => {
    Quote.find()
        .then(quote => res.json(quote))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req,res) => {
    Quote.findById(req.params.id)
      .then(quote => res.json(quote))
      .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const quote = req.body.quote;
    const note= req.body.note;
    const wantToRmb = req.body.wantToRmb;
    const tag = req.body.tag;
 

    const newQuote = new Quote({
        quote, note, wantToRmb, tag
    })

    newQuote.save()
        .then(() => res.json('Quote added'))
        .catch(err => res.status(400).json('Error: ' + err))
})


// router.route('/update/:id').post((req, res) => {
//     Quote.findById(req.params.id)
//     .then(quote=> {
//         quote.quote = req.body.quote;
//         quote.note = req.body.note;
//         quote.tag = req.body.tag;
//         quote.wantToRmb = req.body.wantToRmb;
//         quote.ease = Number(req.body.ease);
//         quote.graduated = req.body.graduated;
//         quote.currentInterval = Number(req.body.currentInterval);
//         quote.whenToShow = Date.parse(req.body.whenToShow);

//         quote.save()
//             .then(() => res.json('Quote Updated!'))
//             .catch(err => res.status(400).json('Error: ' + err))
//     })
//     .catch(err => err.status(400).json('Error: ' + err))
// })

router.put('/update/:id', (req, res) => {
    Quote.findByIdAndUpdate(req.params.id, req.body)
      .then(book => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  });


router.route('/:id').delete((req,res) => {
  Quote.findByIdAndDelete(req.params.id)
      .then(() => res.json('Book deleted'))
      .catch(err => res.status(400).json('Error: ' + err))
})
// { $pull: { 'quote': req.params.name } }



module.exports = router