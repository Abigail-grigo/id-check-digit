import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIdArrey } from './actions'

//css
import './App.css';
import TextField from '@mui/material/TextField';

export default function App() {
  const id = useSelector(state => state.id)
  const dispatch = useDispatch()

  const [checkD, setCeckD] = useState();

  const israelKey = [1, 2, 1, 2, 1, 2, 1, 2];

  //focus next/previes input
  const handleKeyUp = (e) => {
    //prev input
    if (e.key === "Backspace" || e.key === "ArrowLeft") {
      const next = (e.target.tabIndex - 2) * 2;//evry input have 2 elements
      if (next > -1) {
        e.target.form.elements[next].focus();
      }
    }
    else if (!isNaN(e.key)) {
      //update id
      dispatch(setIdArrey(e.target.tabIndex - 1, Number(e.target.value)))
      const next = e.target.tabIndex;
      //next input
      if (next < 8) {
        e.target.form.elements[next * 2].focus();//evry input have 2 elements
        //out
      } else {
        e.target.blur();
        setCeckD(checkDigit(id, israelKey));
      }
    }
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
          <TextField
            key={index}
            type="number"
            onKeyUp={handleKeyUp}
            inputProps={{ tabIndex: index + 1 }}
            autoFocus={index === 0}
            onFocus={(e) => { e.target.select() }}//select to replace when there is some input 
          />
        ))}
      </form>

      <br />
      <p>{checkD || checkD === 0 ? `your check digit is ${checkD}` : ""}</p>

    </div>
  );
}