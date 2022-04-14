const getHttpStatusText = (statusCode) => {
    if (statusCode === 200) return 'Ok';
    if (statusCode === 201) return 'Created';
    if (statusCode === 400) return 'Bad Request';
    if (statusCode === 401) return 'Unauthorized';
    if (statusCode === 403) return 'Forbidden';
    if (statusCode === 500) return 'Internal Server Error';
    if (statusCode === 502) return 'Bad Gateway';
    if (statusCode === 504) return 'Gateway Timeout';
};

const customHeader = () => ({
    'Content-Type': 'application/json',
    Accept: 'application/json',
});

const handleResponse = async (res) => {
    if (res.ok) {
        try {
            const data = await res.json();
            return Promise.resolve(data)
        } catch (e) {
            return Promise.resolve();
        }
    } else {
        let payload = '';
        try {
            payload = await res.json();
        } catch (e) {
            console.log("can't parse payload data");
        }
        const statusCode = res.status;
        const statusText = res.statusText || getHttpStatusText(statusCode);
        return Promise.reject(`${statusCode} | ${statusText} | ${payload.message || ''}`);
    }
};

const CustomHttpClient = {
    get: (url) => {
        return fetch(url, {
            method: 'GET',
            headers: customHeader()
        })
            .then(handleResponse)
            .catch(error => Promise.reject(error));
    },
    post: (url, data = {}) => {
        return fetch(url, {
            method: 'POST',
            headers: customHeader(),
            body: JSON.stringify(data)
        })
            .then(handleResponse)
            .catch(error => Promise.reject(error));
    },
    delete: (url) => {
        return fetch(url, {
            method: 'DELETE',
            headers: customHeader()
        })
            .then(handleResponse)
            .catch(error => Promise.reject(error));
    }
};

export default CustomHttpClient;