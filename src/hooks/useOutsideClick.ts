import { useEffect } from 'react';

const useOutsideClick = (elementRef: React.RefObject<HTMLDivElement>, handler: () => void, attached: boolean) => {

    useEffect(() => {
        if (!attached) return;

        const handleClick = (e: Event) => {
            if (!elementRef.current) return;
            const { target } = e;
            console.log((target as HTMLElement).nodeName);
            if (
                !elementRef.current.contains(e.target as Node) &&
                (target as HTMLElement).nodeName.toLowerCase() !== 'button' &&
                (target as HTMLElement).nodeName.toLowerCase() !== 'svg' &&
                (target as HTMLElement).nodeName.toLowerCase() !== 'path'

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