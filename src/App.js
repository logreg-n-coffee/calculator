// Components
import Wrapper from './components/Wrapper';
import Screen from "./components/Screen";
import ButtonBox from './components/ButtonBox';
import Button from "./components/Button";

// State
import { useSelector, useDispatch } from "react-redux";
import { 
  // state variables - selectors
  selectSign, 
  selectNum, 
  selectRes,
  // actions
  setSign,
  setNum,
  setRes,
  reset
} from "./features/calculatorSlice";

// Formatting
import { removeSpaces } from './features/formatting';

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const App = () => {

  // state selection and dispatch
  const sign = useSelector(selectSign);
  const num = useSelector(selectNum);
  const res = useSelector(selectRes);
  const dispatch = useDispatch();

  // click handlers
  const numClickHandler = e => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(num).length < 16) {
      dispatch(
        setNum(
          num === 0 && value === "0"
            ? "0"
            : removeSpaces(num) % 1 === 0
            ? Number(num + value)
            : (num + value)
        )
      );
      dispatch(
        setRes(!sign ? 0 : res)
      );
    }
  };

  const commaClickHandler = e => {
    e.preventDefault();
    const value = e.target.innerHTML;

    dispatch(
      setNum(!num.toString().includes(".") ? num + value : num)
    );
  };

  const signClickHandler = e => {
    e.preventDefault();
    const value = e.target.innerHTML;

    dispatch(
      setSign(value)
    );

    dispatch(
      setRes(!res && num ? num : res)
    );

    dispatch(
      setNum(0)
    );
  };

  const equalsClickHandler = () => {
    if (sign && num) {
      const math = (a, b, sign) => {
        return (
          sign === "+"
            ? a + b
            : sign === "-"
            ? a - b
            : sign === "X"
            ? a * b
            : a / b
        );
      };

      dispatch(
        setRes(
          num === "0" && sign === "/" 
            ? "Can't divide by zero"
            : math(Number(removeSpaces(res)), Number(removeSpaces(num)), sign)
            )
      );

      dispatch(
        setSign("")
      );

      dispatch(
        setNum(0)
      );
    }
  };

  const invertClickHandler = () => {
    dispatch(
      setNum(num ? removeSpaces(num) * -1 : 0)
    );

    dispatch(
      setRes(num ? removeSpaces(res) * -1 : 0)
    );

    dispatch(
      setSign("")
    );
  };

  const percentClickHandler = () => {
    let newNum = num ? parseFloat(removeSpaces(num)) : 0;
    let newRes = res ? parseFloat(removeSpaces(res)) : 0;

    dispatch(
      setNum((newNum /= Math.pow(100, 1)))
    );

    dispatch(
      setRes((newRes /= Math.pow(100, 1)))
    );

  };

  const resetClickHandler = () => {
    dispatch(reset());
  }

  return (
    <Wrapper>
      <Screen value={num ? num : res} />
      <ButtonBox>
        {
          btnValues.flat().map((button, index) => {
            return (
              <Button
                key={index}
                value={button}
                className={button === "=" ? "equals" : ""}
                onClick={
                  button === "C"
                    ? resetClickHandler
                    : button === "+-"
                    ? invertClickHandler
                    : button === "%"
                    ? percentClickHandler
                    : button === "="
                    ? equalsClickHandler
                    : button === "/" ||
                      button === "X" ||
                      button === "-" ||
                      button === "+"
                    ? signClickHandler
                    : button === "."
                    ? commaClickHandler
                    : numClickHandler
                }
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};


export default App;
