export const selectRecommendedBooks = (state) => state.books.items;
export const selectIsLoading = (state) => state.books.isLoading;
export const selectTotalPages = (state) => state.books.totalPages;
export const selectFilter = (state) => state.books.filter;