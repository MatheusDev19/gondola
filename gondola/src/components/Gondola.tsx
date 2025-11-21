import { Stack, type StackProps } from "@mui/material";

export const Gondola = ({ children, ...rest }: StackProps) => {
  return (
    <Stack
      border="4px solid #2196f3"
      borderRadius="16px"
      p={2}
      gap={1}
      minHeight="80vh"
      bgcolor="#f5f5f5"
      sx={{
        overflowX: "auto",
      }}
      {...rest}
    >
      {children}
    </Stack>
  );
};
