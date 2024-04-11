import { useEffect } from 'react';

const addBody = (classes: string | string[]): void => {
    if (Array.isArray(classes)) {
        classes.forEach(cls => document.body.classList.add(cls));
    } else {
        document.body.classList.add(classes);
    }
}

const removeBody = (classes: string | string[]): void => {
    if (Array.isArray(classes)) {
        classes.forEach(cls => document.body.classList.remove(cls));
    } else {
        document.body.classList.remove(classes);
    }
}

export default function useClass(className: string | string[]): void {
    useEffect(() => {
        if (Array.isArray(className)) {
            className.forEach(addBody);
        } else {
            addBody(className);
        }

        return () => {
            if (Array.isArray(className)) {
                className.forEach(removeBody);
            } else {
                removeBody(className);
            }
        };
    }, [className]);
}
