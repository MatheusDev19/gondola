import { Box } from "@mui/material";
import { useGondola } from "./context";
import { Gondola } from "./components/Gondola";
import type { IModule, IShelf, IShelfColumn } from "./interface";
import { Module } from "./components/Module";
import { Shelf } from "./components/Shelf";
import { UpperStack } from "./components/BaseStack/UpperStack";
import { LowerStack } from "./components/BaseStack/LowerStack";
import { ProductColumnView } from "./components/Product";

export const App = () => {
  const { gondola, addProductToColumn } = useGondola();

  return (
    <Box p={4}>
      <Gondola>
        {gondola.modules.map((module: IModule) => (
          <Module key={module.id}>
            {module.shelves.map((shelf: IShelf) => (
              <Shelf key={shelf.id}>
                <UpperStack>
                  {shelf.upperStack.columns.map((col: IShelfColumn) => (
                    <ProductColumnView
                      key={col.id}
                      column={col}
                      isReversed={false}
                      onAdd={() =>
                        addProductToColumn(shelf.id, "upper", col.id)
                      }
                    />
                  ))}
                </UpperStack>

                <LowerStack>
                  {shelf.lowerStack.columns.map((col) => (
                    <ProductColumnView
                      key={col.id}
                      column={col}
                      isReversed={true}
                      onAdd={() =>
                        addProductToColumn(shelf.id, "lower", col.id)
                      }
                    />
                  ))}
                </LowerStack>
              </Shelf>
            ))}
          </Module>
        ))}
      </Gondola>
    </Box>
  );
};
