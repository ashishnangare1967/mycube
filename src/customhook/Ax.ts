// Custom hook for fetching data with Axios
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAxios = (url: string, initialState: any) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup function if needed
    };
  }, [url]);

  return { data, loading, error };
};
