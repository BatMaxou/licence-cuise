const storage = {
    set: (key, data, expirationDate = null) => {
        if (window.localStorage) {
            localStorage.setItem(key, JSON.stringify({
                data,
                expirationDate
            }));
        }
    },

    get: (key) => {
        if (!window.localStorage) {
            return null;
        }

        const storageData = JSON.parse(localStorage.getItem(key) || '{}');

        if (storageData.expirationDate && new Date(storageData.expirationDate) < new Date()) {
            localStorage.removeItem(key);
            return null;
        }

        return storageData.data || null;
    },

    remove: (key) => {
        if (!window.localStorage || !localStorage.getItem(key)) {
            return false;
        }

        localStorage.removeItem(key);

        return true;
    },
}

export default storage;
