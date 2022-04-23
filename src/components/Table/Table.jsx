import { useState } from 'react';

export default function Table(props) {

    const [data, setData] = useState(props.data)
    const [domainSort, setDomainSort] = useState(null);
    const [countSort, setCountSort] = useState('⬇️');

    const sortData = (num, sign) => {
        const newData = data.sort((a,b) => (a[num] < b[num]) ? (1*sign) : ((b[num] < a[num]) ? (-1*sign) : 0));
        setData(newData);
    };


    const sortColumn = (option) => {

        switch(option) {

            case 'domain':
                setCountSort(null);
                if (domainSort === '⬇️') {
                    sortData(0, -1);
                    setDomainSort('⬆️')
                } else {
                    sortData(0, 1);
                    setDomainSort('⬇️')
                }
                break;
            
            case 'count':
                setDomainSort(null);
                if (countSort === '⬇️') {
                    sortData(1, -1);
                    setCountSort('⬆️')
                } else {
                    sortData(1, 1);
                    setCountSort('⬇️')
                }
                break;
            
            default:
                break;
        }
    };

    return (
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th style={{ width: '70%', cursor: 'pointer' }} onClick={ (e) => sortColumn('domain') }>Domain {domainSort}</th>
                    <th style={{ width: '30%', cursor: 'pointer' }} onClick={ (e) => sortColumn('count') }>Count {countSort}</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.length ? data.map((elem, key) => {
                        return (
                            <tr key={key}>
                                <td>{elem[0]}</td>
                                <td>{elem[1]}</td>
                            </tr>
                        );
                    })
                    : null
                }
            </tbody>
        </table>
    );
}
