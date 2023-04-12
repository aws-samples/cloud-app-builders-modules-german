import { FlashbarProps } from '@cloudscape-design/components';
import { useCallback, useContext, useId } from 'react';
import { NotificationContext } from '../App';
import useAsync from './useAsync';

const useAsyncWithErrorHandling = <T>() => {

    const notifications = useContext(NotificationContext);
    const errorId = useId();
    const safeAsync = useAsync<T>();

    const asyncWithErrorHandling = useCallback((promise: Promise<T>) => {
        return new Promise<T>((resolve, reject) => {
            safeAsync(promise)
                .then(value => resolve(value))
                .catch((error: Error) => {
                    if (error.name && error.name === "AbortError") {
                        reject(error);
                        return;
                    }
                    const errorNotification: FlashbarProps.MessageDefinition = {
                        type: "error",
                        header: error.message ?? "Something went wrong",
                        content: "Please try again later",
                        dismissible: true,
                        dismissLabel: "Dismiss message",
                        id: errorId
                    }
                    notifications.pushNotification(errorNotification);
                    reject(error);
                });


        });
    }, []);

    return asyncWithErrorHandling;
}
export default useAsyncWithErrorHandling;