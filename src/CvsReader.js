import React, { useState } from 'react';

const CvsReader = () => {
    const [csvFile, setCsvFile] = useState();
    const [csvData, setCsvData] = useState([]);

    const processCvs = (str, delimiter = ',') => {
        const headers = str.slice(0, str.indexOf('\n')).split(delimiter);
        const rows = str.slice(str.indexOf('\n') + 1).split('\n');

        const data = rows.map(row => {
            const values = row.split(delimiter);
            const eachObj = headers.reduce((obj, header, i) => {
                obj[header] = values[i]
                return obj;
            }, {})
            return eachObj
        })
        console.log(data);
        setCsvData(data);
    }

    const submit = (e) => {
        const file = csvFile;
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result
            // console.log(text);
            processCvs(text);
        }
        reader.readAsText(file)
    }

    return (
        <>
            <form id="csvForm">
                <input
                    type="file"
                    accept='.csv'
                    id="csvFile"
                    onChange={(e) => setCsvFile(e.target.files[0])}
                />
                <br />
                <button type="submit" onClick={(e) => {
                    e.preventDefault();
                    if (csvFile) submit()
                }}>Cargar Archivo CSV</button>

            </form>
        </>
    );
}

export default CvsReader;
