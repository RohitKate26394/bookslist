import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    axios
      .get('/booklist.json')
      .then((res) => {
        setBooks(res.data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.author.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sort === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sort === 'publicationDate') {
      return a.publicationDate.localeCompare(b.publicationDate);
    } else {
      return 0;
    }
  });

  return (
     <div>
    //   <label>Filter by Author:</label>
    //   <input type="text" value={filter} onChange={handleFilterChange} />

    //   <label>Sort by:</label>
    //   <select value={sort} onChange={handleSortChange}>
    //     <option value="">None</option>
    //     <option value="title">Title</option>
    //     <option value="publicationDate">Publication Date</option>
    //   </select>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publication Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedBooks.map((book) => (
            <tr key={book.id}>
              <td>
                <Link to={`/books/${book.id}`}>{book.title}</Link>
              </td>
              <td>{book.author}</td>
              <td>{book.publicationDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BookList;
