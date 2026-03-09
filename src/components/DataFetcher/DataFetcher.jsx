import { useState, useEffect } from 'react';
import axios from 'axios'

const DataFetcher = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');

            setData(response.data);
            setError(null);
        } catch (err) {
            setError('Сталася помилка при завантаженні даних.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <p>Завантаження даних...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div>
            <h2>Список постів:</h2>
            <ul>
                {data.map(post => (
                <li key={post.id}>
                    <strong>{post.title}</strong>
                    <p>{post.body}</p>
                </li>
                ))}
            </ul>
        </div>
    );
}

export default DataFetcher;