import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const BookForm = ({ book: initialBook, handleOnSubmit }) => {
  // State to manage form data and error message
  const [book, setBook] = useState(
    initialBook || {
      bookname: '',
      author: '',
      quantity: '',
      price: '',
      date: '',
    }
  );
  const [errorMsg, setErrorMsg] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form fields
    const { bookname, author, quantity, price } = book;
    if (!bookname || !author || !quantity || !price) {
      setErrorMsg('Please fill out all fields.');
      return;
    }

    // Generate unique ID for the book
    const id = uuidv4();

    // Construct the book object
    const newBook = {
      id,
      ...book,
      date: new Date().toISOString(), // Use ISO string for date
    };

    // Submit the book object to the parent component
    handleOnSubmit(newBook);

    // Clear the form fields
    setBook({
      bookname: '',
      author: '',
      quantity: '',
      price: '',
      date: '',
    });
    setErrorMsg('');
  };

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  return (
    <div className='main-form'>
      {errorMsg && <p className='errorMsg'>{errorMsg}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='bookname'>
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            type='text'
            name='bookname'
            value={book.bookname}
            placeholder='Enter name of book'
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId='author'>
          <Form.Label>Book Author</Form.Label>
          <Form.Control
            type='text'
            name='author'
            value={book.author}
            placeholder='Enter name of author'
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId='quantity'>
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type='number'
            name='quantity'
            value={book.quantity}
            placeholder='Enter available quantity'
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId='price'>
          <Form.Label>Book Price</Form.Label>
          <Form.Control
            type='text'
            name='price'
            value={book.price}
            placeholder='Enter price of book'
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default BookForm;
