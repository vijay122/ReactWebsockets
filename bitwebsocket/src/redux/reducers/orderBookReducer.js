import {BookActionType} from "../actions/bookActions";

const initialState = null;

const orderBookReducer = (state = initialState,action) => {
    let nextState = state;
    switch (action.type) {
        case BookActionType.SET_BOOKS:
            const { data } = action.payload;
            let result;
            if(data && data[1].length<4) {
                 result = preprocessData(data[1]);
            }
            else if(data[1].length>4)
            {
              //   result = preprocessBatchData(data[1]);
            }

            let currentItems = state && state.currentItems ||[];
            if(currentItems.length>100) {
                currentItems = _.dropRight(currentItems,currentItems.length-100);
            }
            currentItems.unshift(result);
            nextState ={...state, currentItems};
            console.log(nextState);
            break;
        default:
            return state;
    }
    return nextState || state;
};


function preprocessBatchData(bookItems)
{
   let arra=  bookItems && bookItems.reduce && bookItems.reduce(function(result, item, index, array) {
        result["count"] = item; //a, b, c
        result["amount"] = item;
        result["total"] = item;
        result["price"] = item;
        return result;
    }, {})
    return arra;
}

function preprocessData(bookItems)
{
    var result ={};
        result["count"] =bookItems[1]<0? bookItems[1].toFixed(6):bookItems[1]; //a, b, c
        result["amount"] =bookItems[2]<0? bookItems[2].toFixed(4):bookItems[2];
        result["total"] =bookItems[1]<0? bookItems[1].toFixed(6):bookItems[1]; //a, b, c
        result["price"] =bookItems[0]<0? bookItems[0].toFixed(6):bookItems[0];
        return result;
}

export default orderBookReducer;
