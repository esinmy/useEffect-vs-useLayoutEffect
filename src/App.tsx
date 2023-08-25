import { useEffect, useLayoutEffect, useState } from 'react'
import './App.css'


function App() {
  console.log("render")

  const [value, setValue] = useState(0);

  // // First example useEffect and for loop after the first state mutation
  // // Outcome behaviour: After first state mutation setValue(1) browser does not have time to paints 1 (almost always) since blocked by for loop, 
  // // UI is frozen, then flicker happens, then one sees the random value after the second change of state
  useEffect(() => {
    console.log("Hook");
    if (value === 1) {
      console.log("before for");
      for (let index = 0; index < 2e9; index++) {}
      console.log("after for");
      console.log("setValue")
      setValue(Math.random());
    } else {
    }
  }, [value]);

  // // Second example useEffect and for loop after the second state mutation
  // // Outcome behaviour: After first state mutation setValue(1) browser has time to paints 1 (almost always), 
  // // then UI is frozen, then next state mutation happens
  // useEffect(() => {
  //   console.log("Hook");
  //   if (value === 1) {
  //     console.log("setValue")
  //     setValue(Math.random());
  //   } else {
  //     console.log("before for");
  //     for (let index = 0; index < 2e9; index++) {}
  //     console.log("after for");
  //   }
  // }, [value]);

  // // Third example: useLayoutEffect and for loop after the first state mutation
  // // Outcome behaviour: visually no flicker, UI is frozen until useLayoutEffect is executed (two times)
  // useLayoutEffect(() => {
  //   console.log("Hook");
  //   if (value === 1) {
  //     console.log("before for");
  //     for (let index = 0; index < 2e9; index++) {}
  //     console.log("after for");
  //     console.log("setValue")
  //     setValue(Math.random());
  //   } else {
  //   }
  // }, [value]);


  //// Fourth example: useLayoutEffect and for loop after the second state mutation
  //// Outcome behaviour: visually no flicker, ui is frozen until useLayoutEffect is executed (two times)
  // useLayoutEffect(() => {
  //   console.log("Hook");
  //   if (value === 1) {
  //     console.log("setValue")
  //     setValue(Math.random());
  //   } else {
  //     console.log("before for");
  //     for (let index = 0; index < 2e9; index++) {}
  //     console.log("after for");
  //   }
  // }, [value]);


  return (
    <div>
      value: {value}
      <div>
        <button onClick={() => (console.log("Button clicked"), setValue(1))}>Mutate state</button>
      </div>
    </div>
  );
}

export default App;
