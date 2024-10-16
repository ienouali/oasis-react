import {useEffect, useRef} from "react";

export function useOutsideClick({ handler, listenCapturing = true }: { listenCapturing?: boolean; handler: () => void }) {
    const ref = useRef();

    useEffect( () => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !(ref.current as HTMLElement).contains(e.target as Node)) {
                handler()
            }
        }
        document.addEventListener('click', handleClickOutside, listenCapturing)
        return () => document.removeEventListener('click', handleClickOutside, listenCapturing)
    }, [handler, listenCapturing])

    return {
        ref,
    }
}