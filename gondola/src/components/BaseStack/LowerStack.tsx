import type { BoxProps } from "@mui/material";
import { BaseStack } from ".";

export const LowerStack = (props: BoxProps) => {
  return (
    <BaseStack
      {...props}
      border="2px solid #f44336"        
      borderRadius="6px"
      height="60%"
    />
  );
};