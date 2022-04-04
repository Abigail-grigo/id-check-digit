import './App.css';
import { useState } from 'react'

export default function App() {
  const [currId, setId] = useState([]);
  const [checkD, setCeckD] = useState();

  const israelKey = [1, 2, 1, 2, 1, 2, 1, 2];

  //focus next/previes input
  const handleKeyUp = (e) => {
    //prev input
    if (e.key === "Backspace" || e.key === "ArrowLeft") {
      const next = e.target.tabIndex - 2;
      if (next > -1) {
        e.target.form.elements[next].focus();
      }
    } //next input or out
    else if (!isNaN(e.key)) {
      const next = e.target.tabIndex;
      if (next < 8) {
        e.target.form.elements[next].focus();
      } else {
        e.target.blur();
        setCeckD(checkDigit(currId, israelKey));
      }
    }
  };

  //update id
  const handleCange = (e) => {
    let newId = currId;
    newId[e.target.tabIndex - 1] = Number(e.target.value);
    setId(newId);
  };

  //get check digit
  const checkDigit = (id, key) => {
    //id->array key->array

    let newId = id.map((digit, index) => {
      const mul = digit * key[index];
      return Math.floor(mul / 10) + (mul % 10);
    });

    let idSum = newId.reduce((sum, currentValue) => {
      return sum + currentValue;
    }, 0);

    return (10 - (idSum % 10)) % 10;
  };

  return (
    <div className="main">

      <div className="title">Enter your ID to get check digit</div>

      <form className="inputs-container">
        {[...Array(8)].map((_, index) => (
          <input
            key={index}
            type="number"
            onKeyUp={handleKeyUp}
            onChange={handleCange}
            tabIndex={index + 1}
            autoFocus={index === 0}
            onFocus={(e) => { e.target.select() }}//select to replace when there is some input 
          ></input>
        ))}
      </form>
      <br />
      <p>{checkD || checkD === 0 ? `your check digit is ${checkD}` : ""}</p>

    </div>
  );
}