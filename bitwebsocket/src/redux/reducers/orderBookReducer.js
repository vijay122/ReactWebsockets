import {BookActionType} from "../actions/bookActions";

const initialState = {
    reds:null,
    greens:null,
};

const orderBookReducer = (state = initialState,action) => {
    let nextState = state;
    switch (action.type) {
        case BookActionType.SET_BOOKS:
            const { data } = action.payload;
            let result;
            const copyState = _.cloneDeep(state);
            if(data && data[1].length>3) {

                result = preprocessBatchData(data[1],copyState);
            }
            else if(data[1].length==3)
            {
                result = preprocessData(data[1],copyState);
            }

            let currentItems = state && state.currentItems ||[];
            if(result) {
                currentItems = result;
            }
            nextState ={...state, ...currentItems};
            console.log(nextState);
            break;
        default:
            return state;
    }
    return nextState || state;
};


function preprocessBatchData(arrBooks,state)
{
    var op={reds:null,greens:null};
    for(let i=0; i<arrBooks.length; i++)
    {
        op = preprocessData(arrBooks[i],op);
    }
    return op;
}
function preprocessData(bookItems,state)
{
    debugger;
    var value ={
        count:bookItems[1],
        amount:bookItems[2],
        price:bookItems[0],
    }
    var key = bookItems[0];
    let {reds,greens} = state;
    if(bookItems[2]>0)
    {
        if(greens== null)
        {
            greens  = new Map();
            greens.set(key, value);
        }
        else
        {
            if(greens.has(key))
            {
                let oldValue = greens.get(key);
                oldValue.count = oldValue.count + value.count;
                oldValue.amount = oldValue.amount + value.amount;
                greens.delete({key});
                greens.set(key,value);
            }
            else
            {
                greens.set(key,value);
            }
        }
    }
    else
    {
        if(reds== null)
        {
            reds = new Map();
            reds.set(key,value);
        }
        else {
                if(reds.has(key))
                {
                    let oldValue = reds.get(key);
                    oldValue.count = oldValue.count + value.count;
                    oldValue.amount = oldValue.amount + value.amount;
                    reds.delete(key);
                    reds.set(key,value);
                }
                else
                {
                    reds.set(key,value);
                }
        }
    }
    //reds= sortMapByValue(reds);
    //greens = sortMapByValue(greens);
    return {reds,greens};
}

function sortMapByValue(map) {
    var tupleArray = [];
    for (var key in map) tupleArray.push([key, map[key]]);
    tupleArray.sort(function (a, b) {
        return b[1] - a[1]
    });
    var sortedMap = new Map();
    tupleArray.forEach(function (el) {
        sortedMap.set([el[0]],el[1]); // = el[1]
    });
    return sortedMap;
}

export default orderBookReducer;
