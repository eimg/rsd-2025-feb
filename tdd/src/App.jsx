import { useState, useRef } from "react";
import { usd } from "../libs/convert";

export default function App() {
    const inputRef = useRef();
    const [result, setResult] = useState(0);

    return <div>
        <h1 role="title">TDD</h1>
        <form onSubmit={e => {
            e.preventDefault();
            setResult(usd(inputRef.current.value));
            e.currentTarget.reset();
        }}>
            <input type="text" role="input" ref={inputRef} />
            <button type="submit" role="submit">Convert</button>
        </form>
        <div role="result">{result}</div>
    </div>
}
