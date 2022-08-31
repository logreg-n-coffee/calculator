import Wrapper from './components/Wrapper';
import Screen from "./components/Screen";
import ButtonBox from './components/ButtonBox';
import Button from "./components/Button";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const App = () => {
  return (
    <Wrapper>
      <Screen value="0" />
      <ButtonBox>
        {
          btnValues.flat().map((button, index) => {
            return (
              <Button 
                key={index}
                value={button}
                className={button === "=" ? "equals" : ""}
                onClick={() => {
                  console.log(`${button} clicked`);
                }}
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};


export default App;
