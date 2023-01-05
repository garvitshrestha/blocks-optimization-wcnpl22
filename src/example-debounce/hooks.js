const useDebounce = (callback, delay = 500) => {
    let timeoutID;

    return function (...args) {

        const context = this;

        clearTimeout(timeoutID);

        timeoutID = setTimeout(() => {
            callback.apply(context, args);
        }, delay)
    }
}

export { useDebounce };
