import { createMachine, assign } from "xstate";

const changeStep = (direction: string) =>
  assign((context: any, event: any) => {
    return {
      currentStep:
        direction === "up" ? context.currentStep + 1 : context.currentStep - 1,
    };
  });

const formMachine = createMachine(
  {
    // Machine identifier
    id: "form",

    // Initial state
    initial: "stepOne",

    // Local context for entire machine
    context: {
      currentStep: 1,
      stepOne: {
        name: "",
        email: "",
        phoneNumber: "",
      },
      stepTwo: {
        planName: "",
        billingType: "",
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

    // State definitions
    states: {
      stepOne: {
        on: {
          UPDATE_PROPERTY: {
            actions: assign((context: any, event: any) => {
              return {
                stepOne: {
                  ...context.stepOne,
                  [event.property]: event.value,
                },
              };
            }),
          },
          NEXT: {
            actions: changeStep("up"),
            cond: (context: any) => {
              return (
                context.stepOne.name !== "" &&
                context.stepOne.email !== "" &&
                context.stepOne.phoneNumber !== ""
              );
            },
            target: "stepTwo",
          },
        },
      },
      stepTwo: {
        on: {
          PREVIOUS: {
            actions: changeStep("down"),
            target: "stepOne",
          },
          NEXT: {
            actions: changeStep("up"),
            target: "stepThree",
          },
        },
      },
      stepThree: {
        on: {
          PREVIOUS: {
            actions: changeStep("down"),
            target: "stepTwo",
          },
          NEXT: {
            actions: changeStep("up"),
            target: "stepFour",
          },
        },
      },
      stepFour: {
        on: {
          PREVIOUS: {
            actions: changeStep("down"),
            target: "stepThree",
          },
          NEXT: {
            actions: changeStep("up"),
            target: "idle",
          },
        },
      },
      idle: {},
    },
  },
  {
    actions: {
      // Action implementations
    },
  }
);

export default formMachine;

// service.send("keydown.shift");
