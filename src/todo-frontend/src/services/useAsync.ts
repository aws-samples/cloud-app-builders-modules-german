import { useCallback } from 'react';
import useMounted from './useMounted';

const useAsync = <T>() => {
    const isMounted = useMounted();

    const safeAsync = useCallback((promise: Promise<T>) => {
        return new Promise<T>((resolve, reject) => {
            promise.then((value: T) => {
                if (isMounted()) {
                    resolve(value);
                }
            })
                .catch(reject);
        })
    }, []);

    return safeAsync;
}
export default useAsync;