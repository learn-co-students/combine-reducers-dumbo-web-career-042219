import { combinedReducers } from 'redux'
import uuid from "uuid";

const rootReducter = combinedReducers({
  authors: authorsReducer,
  books: booksReducer
});

export default rootReducer

function booksReducer (state = [], action) {
  let idx;
  switch (action.type) {
    case "ADD_BOOK":
      return {
        books: [...state, action.book]
      };

    case "REMOVE_BOOK":
      idx = state.findIndex(book => book.id === action.id);
      return {
        books: [...state.slice(0, idx), ...state.slice(idx + 1)]
      };
    }
}

function authorsReducer (state = [], action) {
  switch (action.type) {
    case "ADD_AUTHOR":
      return {
        authors: [...state, action.author]
      };

    case "REMOVE_AUTHOR":
      idx = state.authors.findIndex(author => author.id === action.id);
      return {
        authors: [...state.slice(0, idx), ...state.slice(idx + 1)]
      };

    case "ADD_BOOK":
      let existingAuthor = state.filter(
        author => author.authorName === action.book.authorName
      );
      if (existingAuthor.length > 0) {
        return state;
      } else {
        return [...state, { authorName: action.book.authorName, id: uuid() }];
      }

    default:
      return state;
  }
}
