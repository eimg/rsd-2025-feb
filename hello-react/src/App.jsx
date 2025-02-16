import { useState, useContext, useEffect, useMemo } from "react";
import { AppContext } from "./AppProvider";

import Item from "./Item";
import Form from "./Form";
import Header from "./Header";

function big() {
    console.log("call big function");
    return "some value";
}

export default function App() {
    const { mode } = useContext(AppContext);

    const value = useMemo(() => {
        return big();
    }, []);

    console.log(value);

    // useEffect(() => {
    //     console.log("do something");
    // }, [mode]);

    // useState, useRef, useContext, useEffect, useMemo

    const [data, setData] = useState([
        { id: 3, content: "Apple", date: "1s" },
        { id: 2, content: "Orange", date: "2s" },
        { id: 1, content: "Milk", date: "3s" },
    ]);

    const del = id => {
        setData(data.filter(item => item.id !== id));
    }

    const add = content => {
        const id = data[0].id + 1;
        setData([ 
            { id, content, date: '1s' },
            ...data 
        ]);
    }

	return (
		<div
			style={{
				background: mode == "dark" ? "#222" : "#efefef",
                color: mode == "dark" ? "white" : "black",
				minHeight: 2000,
			}}>
			<div style={{ maxWidth: 600, margin: "auto" }}>
				<Header />

				<Form add={add} />
				<br />

				{data.map(item => (
					<Item
						key={item.id}
						item={item}
						del={del}
					/>
				))}
			</div>
		</div>
	);
}
