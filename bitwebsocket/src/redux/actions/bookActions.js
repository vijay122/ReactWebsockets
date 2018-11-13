export const BookActionType = {
    SET_BOOKS: "SET_BOOKS",
    SET_BOOK_CHANNEL_ID: "SET_BOOK_CHANNEL_ID",
    SET_BOOK_GRAPH:"SET_BOOK_GRAPH",
    GET_BOOKS: "GET_BOOKS",
};


const setBookData = (data) => ({
    type: BookActionType.SET_BOOKS,
    payload: { data },
});

const setBookGraphData=(data)=>({
    type: BookActionType.SET_BOOK_GRAPH,
    payload: { data },
})

export default {
    setBookData,
    setBookGraphData
}
