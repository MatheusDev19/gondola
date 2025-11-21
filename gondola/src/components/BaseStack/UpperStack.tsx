import type { BoxProps } from "@mui/material";
import { BaseStack } from ".";

export const UpperStack = (props: BoxProps) => {
  return (
    <BaseStack
      {...props}
      border="2px solid #9c27b0"
      borderRadius="6px"
      height="40%"
    />
  );
};
