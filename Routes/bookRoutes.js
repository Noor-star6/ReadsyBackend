const express = require ('express')
const router = express.Router()
const bookController = require ('../App/Controllers/bookController')

router.post('/addbook', bookController.create)
router.get('/getbook', bookController.getAll)
router.get('/singleBook/:book_id', bookController.getSingle)
router.put('/updateBook/:book_id', bookController.updateBook)
router.delete('/deleteStudent/:stud_id', bookController.deleteBook)




module.exports = router