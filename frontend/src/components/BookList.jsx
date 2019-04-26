import React, { Component } from "react";
import { getBooksQuery } from "../queries";
import { graphql } from "react-apollo";
import "./App.css";

import BookDetails from "./BookDetails";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  displayBooks() {
    const data = this.props.data;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map(book => {
        return (
          <li
            onClick={e => {
              this.setState({ selected: book.id });
            }}
            key={book.id}
          >
            {book.name}
          </li>
        );
      });
    }
  }
  render() {
    return (
      <div id="book-list">
        <ul>{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookid
      }
    };
  }
})(BookList);
