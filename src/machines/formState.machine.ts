import { createMachine, assign } from "xstate";

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
            actions: assign((context: any, event: any) => {
              return {
                currentStep: 2,
              };
            }),
            target: "stepTwo",
          },
        },
      },
      stepTwo: {
        on: {
          PREVIOUS: {
            actions: assign((context: any, event: any) => {
              return {
                currentStep: 1,
              };
            }),
            target: "stepOne",
          },
          NEXT: "stepThree",
        },
      },
      stepThree: {
        on: {
          PREVIOUS: "stepOne",
          NEXT: "stepThree",
        },
      },
      stepFour: {
        on: {
          PREVIOUS: "stepOne",
          NEXT: "stepThree",
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
