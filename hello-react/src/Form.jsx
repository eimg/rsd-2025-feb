import { useRef } from "react";

export default function Form({ add }) {
    const inputRef = useRef();

    return <form onSubmit={e => {
        e.preventDefault();
        add(inputRef.current.value);
        e.currentTarget.reset();
    }}>
        <input type="text" placeholder="Content" ref={inputRef} />
        <button type="submit">Add</button>
    </form>
}
