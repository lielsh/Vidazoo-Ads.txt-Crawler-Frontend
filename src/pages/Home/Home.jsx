import { useState, useEffect, useCallback } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchData, setLoading, downloadData } from '../../actions/actions';
import Spinner from '../../components/Spinner/Spinner'
import Table from '../../components/Table/Table';
import './Home.css';

function Home(props) {

    const [start, setStart] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getData = useCallback((domain) => {
        dispatch(setLoading());
        dispatch(fetchData(domain));
        navigate(`/?domain=${domain}`);
        if (!start) {
            setStart(true);
        } 
    }, [dispatch, navigate, start]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const domain = urlParams.get('domain') || "";
        if (domain) {
            getData(domain);
        }
    }, [getData]);

    return (
        <div className='container mx-auto pt-5 pb-5'>
            <h1 className='text-primary'>
                Ads.txt Crawler
            </h1>
            <form className='row pt-3 pb-3' onSubmit={ e => { e.preventDefault(); getData(e.target[0].value); } }>
                <div className="col-md-10">
                    <input type="text" className="form-control" placeholder="Enter domain name... (e.g. msn.com)" required='required'/>
                </div>
                <div className='col-md-2'>
                    <button type="submit" className="btn btn-primary" id="submitBtn">
                        Parse Ads.txt
                    </button>
                </div>
            </form>
            { start === true ?
                props.loading ? 
                <Spinner/> :
                props.data.results.length ?
                    <>
                        <div className='pb-3'>
                            <div className='row p-1 alert alert-success' id="stats">
                                <div className="col-md-2">
                                    Domain: <b>{props.data.domain}</b>
                                </div>
                                <div className="col-md-2">
                                    Total advertisers: <b>{props.data.results.length}</b>
                                </div>
                                <div className="col-md-2">
                                Parse time: <b>{`${props.data.executionTime}ms`}</b>
                                </div>
                                <div className="col-md-2">
                                    Parse errors: <b>{props.data.parseErrors}</b>
                                </div>
                                <div className="col-md-2">
                                    <b className='text-primary' id='downloadClick' onClick={ () => downloadData(props.data) }>Download</b>
                                </div>
                            </div>
                        </div>
                        <Table data={props.data.results}/>
                    </>
                    :
                    <div className='text-center alert alert-danger'>
                        Failed to parse Ads.txt
                    </div>
             : null
            }
        </div>
    ); 
}

const mapStateToProps = state => ({
    data: state.global.data,
    loading: state.global.loading
});

export default connect(mapStateToProps, { fetchData, setLoading, downloadData })(Home);