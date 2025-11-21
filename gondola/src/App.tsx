import { Box } from "@mui/material";
import { useGondola } from "./context";
import { Gondola } from "./components/Gondola";
import { Shelf } from "./components/Shelf";
import { UpperStack } from "./components/BaseStack/UpperStack";
import { LowerStack } from "./components/BaseStack/LowerStack";
import { ProductColumnView } from "./components/Product";

export const App = () => {
  const { getUnifiedShelves, addProductToColumn } = useGondola();

  const unifiedShelves = getUnifiedShelves();

  return (
    <Box p={4}>
      <Gondola>
        {unifiedShelves.map((unifiedShelf) => (
          <Shelf key={unifiedShelf.shelfIndex}>
            <UpperStack>
              {unifiedShelf.upperColumns.map(({ column, shelfId }) => (
                <ProductColumnView
                  key={column.id}
                  column={column}
                  isReversed={false}
                  onAdd={() =>
                    addProductToColumn(shelfId, "upper", column.id)
                  }
                />
              ))}
            </UpperStack>

            <LowerStack>
              {unifiedShelf.lowerColumns.map(({ column, shelfId }) => (
                <ProductColumnView
                  key={column.id}
                  column={column}
                  isReversed={true}
                  onAdd={() =>
                    addProductToColumn(shelfId, "lower", column.id)
                  }
                />
              ))}
            </LowerStack>
          </Shelf>
        ))}
      </Gondola>
    </Box>
  );
};
