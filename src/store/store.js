import { configureStore } from '@reduxjs/toolkit';
import reducer from '../reducers';

const store = configureStore({
    reducer: {
        global: reducer
    }
});

export default store;