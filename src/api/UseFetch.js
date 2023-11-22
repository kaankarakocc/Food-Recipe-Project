import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (endpoint, dataKey) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.request({
                    url: `https://www.themealdb.com/api/json/v1/1/${endpoint}`
                });
                setData(response.data[dataKey]);
            } catch (error) {
                setError(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();

    }, [endpoint]);

    return { data, error, loading }

}

export default useFetch;