import * as types from '../actions/types';

const initialState = {
    data: {},
    loading: false
}

const reducer = (state = initialState, action) => {

    const newState = {...state}

    switch (action.type) {

        case types.FETCH_DATA:
            newState.data = action.payload;
            newState.loading = false;
            break;

        case types.LOADING:
                newState.loading = true;
                break; 
                      
        default:
           break;
    }

    return newState;
}

export default reducer;