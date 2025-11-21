import { Box, type BoxProps } from "@mui/material";

export const Shelf = ({ children, ...rest }: BoxProps) => {
  return (
    <Box
      border="3px solid #ff9800"
      borderRadius="8px"
      p={1}
      display="flex"
      flexDirection-="column"
      height={400}
      gap={1}
      {...rest}
    >
      {children}
    </Box>
  );
};
