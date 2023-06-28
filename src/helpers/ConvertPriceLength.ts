export const ConvertPriceLength = (price: number, plan: string) => {
  if (plan === "Monthly") {
    return `+$${price}/mo`;
  } else {
    return `+$${price}/yr`;
  }
};
