const Book = require('../Models/Book');

module.exports = {
  create: function (req, res) {
    const book = new Book (req.body);
    book.save()
      .then(result => {
        res.status(201).send("Your data is now saved into Database");
      })
      .catch(err => {
        console.error("Error saving book:", err);
        res.status(400).json({ message: "Failed to save book", error: err.message });
      });
  },
 getAll: function(req, res) {
  Book.find()
    .then(results => {
      res.status(200).json(results); 
    })
    .catch(err => {
      res.status(500).json({ message: "Something went wrong", error: err.message });
    });
}

,
getSingle:function(req,res)
{
            Book.findById(req.params.book_id).then(results=>{
                res.send(results)
            })
            .catch(err=>{
                res.send("SOmething went wrong!!!!" + err)
            })
}
,
updateBook:function(req,res)
{
            Book.findByIdAndUpdate(req.params.book_id,req.body).then(results=>{
                res.send(results + "your data updated successfully")
            })
            .catch(err=>{
                res.send("SOmething went wrong!!!!" + err)
            })
}
,

deleteBook:function(req,res)
{
            Book.findByIdAndDelete(req.params.book_id).then(results=>{
                res.send(results + "your data deleted successfully")
            })
            .catch(err=>{
                res.send("SOmething went wrong!!!!" + err)
            })
}





}