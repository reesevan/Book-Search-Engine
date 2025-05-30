import { useState, FormEvent } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row,
} from 'react-bootstrap';
import { useLazyQuery } from '@apollo/client';
import { QUERY_BOOKS } from '../utils/queries';

type Book = {
  bookId: string;
  authors: string[];
  description: string;
  title: string;
  image?: string;
  link?: string;
};

const SearchBooks = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);

  // Apollo lazy query hook: does not run automatically, but only when you call `searchBooks()`
  const [searchBooks, { loading, data, error }] = useLazyQuery(QUERY_BOOKS, {
    onCompleted: (data) => {
      // Set the books returned from the query to local state
      if (data?.searchBooks) {
        setSearchedBooks(data.searchBooks);
      }
    },
  });

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchInput.trim()) {
      return;
    }

    // Trigger the GraphQL search with the user's input
    searchBooks({ variables: { query: searchInput } });
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a book"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className="pt-5">
          {loading
            ? 'Loading results...'
            : searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>

        {error && (
          <p className="text-danger">Error occurred while searching. Please try again.</p>
        )}

        <Row>
          {searchedBooks.map((book) => (
            <Col md="4" key={book.bookId}>
              <Card border="dark" className="mb-3">
                {book.image && (
                  <Card.Img
                    src={book.image}
                    alt={`Cover for ${book.title}`}
                    variant="top"
                    style={{ maxHeight: '250px', objectFit: 'contain' }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors.join(', ')}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {book.link && (
                    <Card.Link href={book.link} target="_blank" rel="noopener noreferrer">
                      More Info
                    </Card.Link>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;
