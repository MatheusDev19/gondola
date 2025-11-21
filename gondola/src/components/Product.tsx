import { Box, type BoxProps } from "@mui/material";
import type { IShelfColumn } from "../interface";
import { ShelfColumn } from "./ShelfColumn";

export const Product = ({ ...rest }: BoxProps) => {
  return (
    <Box
      width="90%"
      height={20}
      borderRadius={2}
      flexShrink={0}
      bgcolor="#333"
      {...rest}
    />
  );
};

interface ProductColumnViewProps {
  column: IShelfColumn;
  isReversed: boolean;
  onAdd: () => void;
}

export const ProductColumnView = ({
  column,
  isReversed,
  onAdd,
}: ProductColumnViewProps) => {
  return (
    <ShelfColumn isReversed={isReversed} onClick={onAdd}>
      {column.products.map((prod) => (
        <Product key={prod.id} bgcolor={prod.color} />
      ))}
    </ShelfColumn>
  );
};
