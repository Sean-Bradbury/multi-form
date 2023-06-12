import React from "react";
import StepStatus from "./components/StepStatus";
import Form from "./components/Form";
import TitleArea from "./components/TitleArea";
import Input from "./components/UI/Input";
import { styled, ThemeProvider } from "styled-components";
import { useMachine } from "@xstate/react";
import theme from "./theming/theme";

import formMachine from "./machines/formState.machine";

import "./App.scss";

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 16px;
  border-radius: 16px;
  gap: 60px;
  width: 940px;
  height: 600px;
`;

function App() {
  const [current, send] = useMachine(formMachine, {
    context: {
      stepOne: {
        name: "",
        email: "",
        phoneNumber: "",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <MainContainer>
          <StepStatus />

          <Form
            onSubmit={() => {
              console.log("submitted");
            }}
          >
            {current.context.currentStep}
            {current.matches("stepOne") && (
              <>
                <TitleArea title="Hello" subtitle="World" />
                <Input
                  id="name"
                  type="text"
                  label="Name"
                  value={current.context.stepOne.name}
                  callback={(property, value) => {
                    send("UPDATE_PROPERTY", {
                      value: value,
                      property: property,
                    });
                  }}
                  placeHolder="e.g. Stephen King"
                />
                <Input
                  id="email"
                  type="text"
                  label="Email"
                  value={current.context.stepOne.email}
                  callback={(property, value) => {
                    send("UPDATE_PROPERTY", {
                      value: value,
                      property: property,
                    });
                  }}
                  placeHolder="e.g. stephen.king@email.com"
                />
                <Input
                  id="phoneNumber"
                  type="text"
                  label="Phone Number"
                  value={current.context.stepOne.phoneNumber}
                  callback={(property, value) => {
                    send("UPDATE_PROPERTY", {
                      value: value,
                      property: property,
                    });
                  }}
                  placeHolder="e.g. 555-555-5555"
                />
              </>
            )}
            {!current.matches("stepOne") && (
              <button
                onClick={() => {
                  send("PREVIOUS");
                }}
              >
                Previous step
              </button>
            )}

            <button
              onClick={() => {
                send("NEXT");
              }}
            >
              Next step
            </button>
          </Form>
        </MainContainer>
      </div>
    </ThemeProvider>
  );
}

export default App;
