import { useState, useEffect } from 'react';

/**
 * Like useState, but sets the value only after a debounce delay.
 */
function useDebouncedState<T>(initialValue: T, delay = 300): [T, (val: T) => void] {
    const [value, setValue] = useState<T>(initialValue);
    const [tempValue, setTempValue] = useState<T>(initialValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setValue(tempValue);
        }, delay);

        return () => clearTimeout(handler);
    }, [tempValue, delay]);

    return [value, setTempValue];
}

export default useDebouncedState;


/**
const [searchTerm, setSearchTerm] = useDebouncedState('', 300);
// const [searchTerm, setSearchTerm] = useDebouncedState(''); //both will work because defult delay is given

return (
  <input
    type="text"
    placeholder="Search..."
    onChange={(e) => setSearchTerm(e.target.value)}
  />
);

const [debouncedNumber, setDebouncedNumber] = useDebouncedState<number | null>(null, 500);

<input
  type="number"
  onChange={(e) => {
    const value = e.target.value;
    setDebouncedNumber(value === '' ? null : Number(value));
  }}
/>

 */
