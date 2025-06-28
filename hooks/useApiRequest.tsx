import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface UseApiRequestOptions {
    autoFetch?: boolean;
    token?: string;
    dependencies?: any[];
}

const useApiRequest = <T = any>(
    url: string,
    method: string,
    payload?: any,
    options?: UseApiRequestOptions
) => {
    const {
        autoFetch = true,
        token,
        dependencies = [],
    } = options || {};

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const normalizedMethod = method.toLowerCase() as Method;

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const authToken = token || localStorage.getItem('authToken');

            const config: AxiosRequestConfig = {
                method: normalizedMethod,
                url,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authToken ? `Bearer ${authToken}` : '',
                },
                ...(normalizedMethod !== 'get' ? { data: payload } : {}),
            };

            const response = await axios(config);
            setData(response.data);
        } catch (err: any) {
            setError(err.response?.data || err.message || err);
        } finally {
            setLoading(false);
        }
    }, [url, normalizedMethod, payload, token]);

    // Optional auto-fetching
    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData, ...dependencies]);

    return { data, loading, error, refetch: fetchData };
};

export default useApiRequest;


/**
    // Auto-fetch GET
    const { data, loading, error } = useApiRequest('/api/products', 'GET');

    // Create item via POST
    const {
    data: newItem,
    loading: creatingItem,
    error: errorCreatingItem,
    refetch: createItem
    } = useApiRequest('/api/items', 'POST', { name: 'New Item' }, {
    autoFetch: false
    });


    <button onClick={createItem}>Create Item</button>

    //With custom token and dependencies
    const { data, refetch } = useApiRequest('/api/secure', 'get', null, {
        token: session.token,
        dependencies: [session.token]
    });
 */