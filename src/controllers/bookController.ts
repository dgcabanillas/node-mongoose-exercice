import { Book, CreateBook, IBook } from '../models/bookModel';
import { Request, Response } from 'express';

export const addNewBook = async (req: Request<{}, {}, CreateBook>, res: Response): Promise<void> => {
  const { title, overview, category, price } = req.body;

  if (!title || !overview || !price ) {
    res.status(400).send({ error: 'data is not complete' });
  }

  try {
    const book = new Book({ title, overview, category, price });
    const newBook = await book.save();
    res.status(201).json({ data: newBook });
  } catch (error) {
    res.status(400).json({ error: 'error saving book' });
  }
}

export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books: IBook[] = await Book.find({});
    res.status(200).json({ books });
  } catch (error: any) {
    res.send(400).json({});
  }
}

export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const book: IBook | null = await Book.findById({ _id: id });
    res.status(200).json({ book });
  } catch (error: any) {
    res.send(400).json({});
  }
}

export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = req.params.id;
    const { title, overview, category, price } = req.body;

    if (!title || !overview || !price || !bookId ) {
      res.status(400).send({ error: 'data is not complete' });
    }

    const newBookInfo: IBook | null = await Book.findOneAndUpdate({ _id: bookId }, { title, overview, category, price }, { new: true });
    res.status(200).json({ newBookInfo });
  } catch (error: any) {
    res.send(400).json({});
  }
}

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = req.params.id;
    await Book.deleteOne({ _id: bookId });
    res.status(200).json({ message: 'book successfully deleted' });
  } catch (error: any) {
    res.send(400).json({});
  }
}