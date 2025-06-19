import { useState, useCallback, useRef } from "react";
import "./input.css";
import "./assets/react.svg"
import { useEffect } from "react";

function App() {
  const [length, setLength] = useState(6);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (character) str += "!#$%&'()*+-./:;<=>?@[]^_{}~";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      setPassword(pass);
    }
  }, [length, number, character, setPassword]);

  const copyClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 6);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const colorChange = () => {
    alert("Text copied to clipboard!");
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, character, number, passwordGenerator]);

  return (
    <div>
      <div className="w-full text-center max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700  max-md:my-[200px] max-md:h-[300px] max-md:w-[300px]">
        <h1 className="text-3xl text-center text-white max-md:my-[50px]">Password Generator</h1>
        <div className="flex shadow-lg rounded-lg overflow-hidden mb-4">
          <input
            ref={passwordRef}
            value={password}
            className="outline-none w-full py-1 px-3 bg-white"
            placeholder="password"
            readOnly
            type="text"
          />
          <button 
            onClick={() => {
              copyClipboard();
              colorChange();
            }}
            className="outline-none bg-blue-400 text-white px-3 py-0.5 shrink-0 hidden"
          >
            Copy
          </button>
        </div>
        <div className="flex gap-x-2 max-md:grid max-md:items-center max-md:text-2xl">
          <div className="items-center flex gap-x-1 ">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          
          <label className="max-md:text-2xl">length: {length}</label>
          <div className="flex items-center gap-x-1 max-md:mx-[70px]">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">numbers</label>
          </div>
          <div className="flex items-center gap-x-1 max-md:mx-[70px]">
            <input
              type="checkbox"
              defaultChecked={number}
              id="characterInput"
              onChange={() => {
                setCharacter((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">character</label>
          </div>

        </div>
          <button 
            onClick={() => {
              copyClipboard();
              colorChange();
            }}
            className="outline-none items-center bg-blue-400 text-white px-3 py-0.5 shrink-0 max-md:my-[10px] max-md:h-[40px] max-md:w-[70px] max-md:rounded-lg"
          >
            Copy
          </button>
      </div>
    </div>
  );
}

export default App;