const Book = require('models/book');

exports.list = async (ctx) => {
  let books;

  try {
    books = await Book.find()
      .sort({_id: -1})
      // .limit(20) 나중에 페이지 할 때
      .exec();
  } catch(e) {
    return ctx.throw(500, e);
  };

  ctx.body = books;
};

exports.get = async (ctx) => {
  const { email } = ctx.params;

  let book;

  try {
    book = await Book.findByEmail(email);
  } catch(e) {
    if(e.name === 'CastError'){
      ctx.status = 400;
      return;
    }
    return ctx.throw(500, e)
  };

  if(!book) {
    ctx.status = 404;
    ctx.body = { message: 'book not found' };
    return;
  };

  ctx.body = book.bookcase;
}

exports.getBook = async (ctx) => {
  const { email } = ctx.params;
  const { isbn } = ctx.request.body;
  let books;
  let book;

  // try{
  //   book = await Book.findByEmailAndBook({email, isbn})
  // } catch(e){
  //   return ctx.throw(500, e)
  // }

  try {
    books = await Book.findByEmail(email);
  } catch(e) {
    if(e.name === 'CastError'){
      ctx.status = 400;
      return;
    }
    return ctx.throw(500, e)
  };

  if(!books) {
    ctx.status = 404;
    ctx.body = { message: 'book not found' };
    return;
  };

  try {
    book = await books.findBook({isbn});
  } catch(e) {
    return ctx.throw(500, e)
  }

  ctx.body = book;
}

// exports.create = async (ctx) => {
//   const { authors, contents, datetime, isbn, price, publisher, sale_price, status, thumbnail, title, translators, url, type, grade } = ctx.request.body;
//   const book = new Book({ authors, contents, datetime, isbn, price, publisher, sale_price, status, thumbnail, title, translators, url, type, grade });

//   let existing = null;
//   try {
//     existing = await Book.findByIsbn(isbn);
//   } catch(e) {
//     ctx.throw(500, e);
//   };

//   if(existing) {
//     ctx.status = 409;
//     return;
//   };

//   try {
//     await book.save();
//   } catch(e) {
//     return ctx.throw(500, e);
//   };

//   ctx.body = book;
// }

exports.create = async (ctx) => {
  const { email, bookcase } = ctx.request.body;
  const book = new Book({ email, bookcase });

  let existing = null;
  try {
    existing = await Book.findByEmail(email);
  } catch(e) {
    ctx.throw(500, e);
  };

  if(existing) {
    ctx.status = 409;
    return;
  };

  try {
    await book.save();
  } catch(e) {
    return ctx.throw(500, e);
  };

  ctx.body = book;
}

exports.delete = async (ctx) => {
  const { id } = ctx.request.body

  try {
    await Book.findByIdAndRemove(id).exec();
  } catch(e) {
    if(e.name === 'CastError'){
      ctx.status = 400;
      return;
    }
  }

  ctx.body = 'success'
}

// exports.replace = async (ctx) => {
//   const { email } = ctx.params;
//   let book;

//   try {
//     book = await Book.findByIdAndUpdate(email, ctx.request.body, {
//       upsert: true,
//       new: true
//     });
//   } catch(e) {
//     return ctx.throw(500, e);
//   };

//   ctx.body = book;
// }
exports.replace = async (ctx) => {
  const { email } = ctx.params;
  let book;

  console.log( ctx.request.body )
  try {
    book = await Book.findOneAndUpdate(email, {
      $push: {
        bookcase: ctx.request.body
      }
    }, 
    {
      upsert: true,
      new: true
    });
  } catch(e) {
    return ctx.throw(500, e);
  };

  ctx.body = book;
}

exports.bookUpdate = async (ctx) => {
  const { email } = ctx.params;

  let book;

  try {
    book = await Book.findOneAndUpdate(email, { 
      $push: {
        bookcase: ctx.request.body
      }
    }, 
    {
      new: true
    });
  } catch(e) {
    return ctx.throw(500, e);
  };

  ctx.body = book;
}

exports.addBook = async (ctx) => {
  const { email } = ctx.params;

  let book;

  try {
    book = await Book.findOneAndUpdate(email, {
      $push: {bookcase: ctx.request.body }
    }, {
      new: true
    });
    // book = await Book.findByEmail(email);
  } catch(e) {
    return ctx.throw(500, e);
  };

  // try {
  //   book.addBook(ctx.request.body)
  // } catch(e) {
  //   return ctx.throw(500, e);
  // }

  ctx.body = book;
}

exports.removeBook = async (ctx) => {
  const { email } = ctx.params;
  const { isbn } = ctx.request.body
  // console.log("isbn", isbn)
  let book;

  try {
    book = await Book.findOneAndUpdate(email, {
      $pull: { bookcase: { isbn } }
    }, {
      new: true
    });
  } catch(e) {
    return ctx.throw(500, e);
  };

  ctx.body = book;
}