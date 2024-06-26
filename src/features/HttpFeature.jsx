const HttpFeature = () => {
    const makeRequest = async (url, method, params) => {
        try {
            if (method != 'GET') {
                console.log('Method is Get');
            } else {
                const response = await fetch(`/api${url}/${params}`, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status != 200) {
                    return false;
                }

                return await response.json();
            }
        } catch (error) {
            console.error('Error fetching ', error);
            return error;
        }
    };

    return { makeRequest };
};

export default HttpFeature;
