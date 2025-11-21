import { Box } from "@mui/material";

interface ShelfColumnProps {
  isReversed?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

export const ShelfColumn = ({
  isReversed = false,
  children,
  onClick,
  ...rest
}: ShelfColumnProps) => {
  return (
    <Box
      border="2px solid #795548"
      borderRadius="4px"
      minWidth={40}
      flex={1}
      display="flex"
      flexDirection={isReversed ? "column-reverse" : "column"}
      justifyContent="flex-start"
      alignItems="center"
      p={0.5}
      gap={1}
      onClick={onClick}
      bgcolor="#fffefe"
      sx={{
        transition: "background-color 0.2s",
        "&:hover": {
          backgroundColor: "#efebe9",
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
