import { Box, type BoxProps } from "@mui/material";

export const Module = ({ children, ...rest }: BoxProps) => {
  return (
    <Box
      border="3px solid #4caf50"
      borderRadius="12px"
      p={1}
      display="flex"
      flexDirection="column"
      gap={2}
      minWidth={300}
      flex={1}
      bgcolor="#ffffff"
      sx={{
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
