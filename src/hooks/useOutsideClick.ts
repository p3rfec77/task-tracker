import { useEffect } from 'react';

const useOutsideClick = (elementRef: React.RefObject<HTMLUListElement>, handler: () => void, attached: boolean) => {

    useEffect(() => {
        if (!attached) return;

        const handleClick = (e: Event) => {
            if (!elementRef.current) return;
            const { target } = e;
            console.log(attached);
            console.log(handler);
            console.log((target as HTMLElement).nodeName);
            if (
                !elementRef.current.contains(e.target as Node) &&
                (target as HTMLElement).nodeName !== 'BUTTON'
            ) {
                handler();
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };

    }, [attached, elementRef, handler]);
}

export default useOutsideClick