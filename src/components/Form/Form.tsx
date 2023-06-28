import { useEffect, useMemo } from "react";
import styled from "styled-components";
import FormButton from "./FormButton";
import TitleArea from "../TitleArea";
import PlanCard from "../PlanCard";
import Container from "../Container";
import ConfirmContent from "../ConfirmContent";
import AddOnItem from "../AddOnItem";
import Input from "../UI/Input";
import Toggle from "../UI/Toggle";
import Checkbox from "../UI/Checkbox";
import { useMachine } from "@xstate/react";
import formMachine from "../../machines/formState.machine";

import { ConvertPriceLength } from "../../helpers/ConvertPriceLength";

// Data
import { plans, addons } from "../../data/data";

interface FormProps {
  className?: string;
  onSubmit: () => void;
  setCurrentStep: (step: number) => void;
}

interface FormButtonsProps {
  hasonebutton: boolean | string;
}

const FormButtons = styled.div<FormButtonsProps>`
  display: flex;
  justify-content: space-between;
  justify-content: ${(props) => props.hasonebutton && "flex-end"};
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
  gap: 30px;
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
      stepTwo: {
        planName: "Arcade",
        billingType: "Monthly",
      },
      stepThree: {
        addOns: [],
      },
      errors: {
        name: "",
        email: "",
        phoneNumber: "",
      },
    },
  });

  const { planName, billingType } = current.context.stepTwo;
  const { addOns } = current.context.stepThree;

  const planPrice = useMemo(() => {
    const matchingPlan = plans.plans.find(
      (item) => item.title === planName
    ) || {
      monthlyPrice: 0,
      yearlyPrice: 0,
    };

    return ConvertPriceLength(
      billingType === "Monthly"
        ? matchingPlan.monthlyPrice
        : matchingPlan.yearlyPrice,
      billingType
    );
  }, [planName, billingType]);

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
        {current.matches("stepOne") && (
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
        {current.matches("stepTwo") && (
          <>
            <TitleArea
              title="Select your plan"
              subtitle="You have the option of monthly or yearly billing."
            />
            <Container gap={16}>
              {plans.plans.map((plan) => {
                return (
                  <PlanCard
                    key={plan.title}
                    icon={plan.title.toLowerCase()}
                    title={plan.title}
                    price={ConvertPriceLength(
                      billingType === "Monthly"
                        ? plan.monthlyPrice
                        : plan.yearlyPrice,
                      billingType
                    )}
                    selected={current.context.stepTwo.planName === plan.title}
                    onClick={(title) => {
                      send("SELECT_PLAN", { planName: title });
                    }}
                  />
                );
              })}
            </Container>
            <Toggle
              leftText="Monthly"
              rightText="Yearly"
              option={current.context.stepTwo.billingType}
              callback={(type) => {
                send("SELECT_BILLING", { billingType: type });
              }}
            />
          </>
        )}

        {current.matches("stepThree") && (
          <>
            <TitleArea
              title="Pick add-ons"
              subtitle="Add-ons help enhance your gaming experience."
            />
            {addons.addOns.map((addon) => {
              return (
                <Checkbox
                  key={addon.title}
                  title={addon.title}
                  subtitle={addon.subtitle}
                  price={ConvertPriceLength(
                    billingType === "Monthly"
                      ? addon.monthlyPrice
                      : addon.yearlyPrice,
                    billingType
                  )}
                  checked={current.context.stepThree.addOns.includes(
                    addon.title
                  )}
                  onChange={() => {
                    send("SELECT_ADDON", { addonName: addon.title });
                  }}
                />
              );
            })}
          </>
        )}
        {current.matches("stepFour") && (
          <>
            <TitleArea
              title="Finishing up"
              subtitle="Double-check everything looks OK before confirming."
            />
            <ConfirmContent>
              <Container justify="space-between">
                <div>
                  <h3>
                    {planName} ({billingType})
                  </h3>
                </div>
                <div>{planPrice}</div>
              </Container>
              <div>
                {addOns.map((addon) => {
                  const matchingAddon = addons.addOns.find(
                    (item) => item.title === addon
                  );

                  if (!matchingAddon) return null;

                  return (
                    <AddOnItem
                      key={addon}
                      addon={addon}
                      price={ConvertPriceLength(
                        billingType === "Monthly"
                          ? matchingAddon.monthlyPrice
                          : matchingAddon.yearlyPrice,
                        billingType
                      )}
                    />
                  );
                })}
              </div>
            </ConfirmContent>
          </>
        )}

        <FormButtons
          hasonebutton={current.matches("stepOne") ? "true" : "false"}
        >
          {!current.matches("stepOne") && (
            <FormButton
              onClick={() => {
                send("PREVIOUS");
              }}
              secondary={true}
              text="Go Back"
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
