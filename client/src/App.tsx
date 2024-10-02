import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import IO from "./utils/socketio";

function App() {
	useEffect(() => {
		IO.on("connect", () => {
			console.log("connected", IO.id);
			IO.emit("ping-server", {
				userSocketId: IO.id,
			});
		});

		IO.on("connect_error", (err) => {
			console.log(`ARR::connect_error due to ${err.message}`);
		});
	}, []);

	const pingServer = async () => {
		IO.emit("ping-server", {
			userSocketId: IO.id,
		});
	};

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				<br />
				<button
					onClick={() => {
						pingServer();
					}}
				>
					Ping Server
				</button>
			</header>
		</div>
	);
}

export default App;
