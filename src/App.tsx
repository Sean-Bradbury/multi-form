import React, { useState } from "react";
import StepStatus from "./components/StepStatus";
import Form from "./components/Form";
import { styled, ThemeProvider } from "styled-components";
import theme from "./theming/theme";

import "./App.scss";

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 16px;
  border-radius: 16px;
  width: 940px;
  height: 600px;
`;

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <MainContainer>
          <StepStatus currentStep={currentStep} />
          <Form
            onSubmit={() => {
              console.log("submitted");
            }}
            setCurrentStep={setCurrentStep}
          />
        </MainContainer>
      </div>
    </ThemeProvider>
  );
}

export default App;
