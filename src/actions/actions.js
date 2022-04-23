import axios from 'axios';
import * as types from './types';
import fileDownload from 'js-file-download';
import { jsonStringify } from '../functions/jsonStringify';

export const fetchData = (domain) => async dispatch => {

    let data = {};

    await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_DATA}${domain}`
    })
        .then(res => data = res.data)
        .catch(err => console.log(err));
     
    dispatch({
        type: types.FETCH_DATA,
        payload: data
    });
}

export const setLoading = () => dispatch => {

    dispatch({
        type: types.LOADING
    });
}

export const downloadData = (data) => {

    const str = jsonStringify(data);
    const bytes = new TextEncoder().encode(str);
    const blob = new Blob([bytes], {
        type: "application/json;charset=utf-8"
    });

    fileDownload(blob, `adstxt_${data.domain}.json`);
}