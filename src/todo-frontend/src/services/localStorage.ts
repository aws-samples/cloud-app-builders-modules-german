export const save = (key: string, value: any) => new Promise<void>((resolve, reject) => {
    localStorage.setItem(key, JSON.stringify(value))
    resolve();
});

export const load = <T>(key: string) => {
    return new Promise<T>((resolve, reject) => {
        const value = localStorage.getItem(key);
        try {
            resolve(value && JSON.parse(value));
        } catch (e) {
            console.warn(
                `⚠️ The ${key} value that is stored in localStorage is incorrect. Try to remove the value ${key} from localStorage and reload the page`
            );
            reject(undefined);
        }
    });
};