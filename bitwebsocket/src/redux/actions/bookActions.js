export const BookActionType = {
    SET_BOOKS: "SET_BOOKS",
    SET_BOOK_CHANNEL_ID: "SET_BOOK_CHANNEL_ID",
    GET_BOOKS: "GET_BOOKS",
};


const setBookData = (data) => ({
    type: BookActionType.SET_BOOKS,
    payload: { data },
});

export default {
    setBookData
}
