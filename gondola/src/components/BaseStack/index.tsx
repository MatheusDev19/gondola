import { Box, type BoxProps } from "@mui/material";

export const BaseStack = ({ children, ...rest }: BoxProps) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      gap={1}
      p={1}
      alignItems="stretch"
      sx={{
        overflowX: "auto",
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
