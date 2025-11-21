import { Stack } from "@mui/material";
import type { StackProps } from "@mui/material";

export const Shelf = ({ children, ...rest }: StackProps) => {
  return (
    <Stack
      border="3px solid #ff9800"
      borderRadius="8px"
      p={1}
      direction="column"
      height={400}
      gap={1}
      {...rest}
    >
      {children}
    </Stack>
  );
};
