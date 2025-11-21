import { Stack } from "@mui/material";
import type { StackProps } from "@mui/material";

export const Module = ({ children, ...rest }: StackProps) => {
  return (
    <Stack
      border="3px solid #4caf50"
      borderRadius="12px"
      p={1}
      direction="column"
      gap={2}
      minWidth={300}
      flex={1}
      bgcolor="#ffffff"
      {...rest}
    >
      {children}
    </Stack>
  );
};
