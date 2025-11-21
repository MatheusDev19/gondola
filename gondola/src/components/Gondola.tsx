import { Box, type BoxProps } from "@mui/material";

export const Gondola = ({ children, ...rest }: BoxProps) => {
  return (
    <Box
      border="4px solid #2196f3"
      borderRadius="16px"
      p={2}
      display="flex"
      gap={2}
      minHeight="80vh"
      bgcolor="#f5f5f5"
      sx={{
        overflowX: "auto",
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
