import { useEffect, useMemo } from "react";
import styled from "styled-components";
import FormButton from "./FormButton";
import TitleArea from "../TitleArea";
import PlanCard from "../PlanCard";
import Container from "../Container";
import Input from "../UI/Input";
import { useMachine } from "@xstate/react";
import formMachine from "../../machines/formState.machine";

interface FormProps {
  className?: string;
  onSubmit: () => void;
  setCurrentStep: (step: number) => void;
}

interface FormButtonsProps {
  oneButton?: boolean;
}

const FormButtons = styled.div<FormButtonsProps>`
  display: flex;
  justify-content: space-between;
  justify-content: ${(props) => props.oneButton && "flex-end"};
  align-items: center;
  gap: 16px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding-left: 40px;
`;

interface FormContentProps {
  step?: string;
}

const FormContent = styled.div<FormContentProps>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 450px;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Form = ({ className, onSubmit, setCurrentStep }: FormProps) => {
  const [current, send] = useMachine(formMachine, {
    context: {
      stepOne: {
        name: "",
        email: "",
        phoneNumber: "",
      },
      errors: {
        name: "",
        email: "",
        phoneNumber: "",
      },
    },
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  // Keep track of current step
  useEffect(() => {
    setCurrentStep(current.context.currentStep);
  }, [current.context.currentStep, setCurrentStep]);

  return (
    <form onSubmit={submitHandler} className={className}>
      <FormContent step="stepOne">
        {current.matches("stepTwo") && (
          <>
            <TitleArea
              title="Personal info"
              subtitle="Please provide your name, email address, and phone number."
            />
            <Input
              id="name"
              type="text"
              label="Name"
              value={current.context.stepOne.name}
              error={current.context.errors.name}
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
        {current.matches("stepOne") && (
          <>
            <TitleArea
              title="Select your plan"
              subtitle="You have the option of monthly or yearly billing."
            />
            <Container gap={16}>
              <PlanCard icon="arcade" title="Arcade" price="$9/mo" selected />
              <PlanCard icon="advanced" title="Advanced" price="$12/mo" />
              <PlanCard icon="pro" title="Pro" price="$15/mo" />
            </Container>
          </>
        )}

        {current.matches("stepThree") && (
          <>
            <TitleArea
              title="Pick add-ons"
              subtitle="Add-ons help enhance your gaming experience."
            />
          </>
        )}
        {current.matches("stepFour") && (
          <>
            <TitleArea
              title="Finishing up"
              subtitle="Double-check everything looks OK before confirming."
            />
          </>
        )}

        <FormButtons oneButton={current.matches("stepOne")}>
          {!current.matches("stepOne") && (
            <FormButton
              onClick={() => {
                send("PREVIOUS");
              }}
              secondary={true}
              text="Previous step"
            />
          )}

          <FormButton
            onClick={() => {
              send("NEXT");
            }}
            text="Next step"
          />
        </FormButtons>
      </FormContent>
    </form>
  );
};

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  padding: 40px;
  width: 100%;
  height: 100%;
  position: relative;
`;

export default StyledForm;
