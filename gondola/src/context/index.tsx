/* eslint-disable react-refresh/only-export-components */
// GondolaContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { v4 as uuidv4 } from "uuid"; // Instale: npm i uuid @types/uuid
import type { IGondola, IModule, IProduct, IShelf, IShelfColumn } from "../interface";

interface GondolaContextType {
  gondola: IGondola;
  addProductToColumn: (
    shelfId: string,
    stackType: "upper" | "lower",
    columnId: string
  ) => void;
  getModuleByXPosition: (xPosition: number) => IModule | undefined;
  getUnifiedShelves: () => IUnifiedShelf[];
}

// Interface para shelf unificada (combinação de shelves de diferentes módulos)
export interface IUnifiedShelf {
  shelfIndex: number;
  upperColumns: Array<{ column: IShelfColumn; moduleId: string; shelfId: string }>;
  lowerColumns: Array<{ column: IShelfColumn; moduleId: string; shelfId: string }>;
}

const GondolaContext = createContext<GondolaContextType | undefined>(undefined);

// --- Helper para criar dados iniciais (Mock) ---
const createMockGondola = (): IGondola => {
  const createColumns = (count: number) =>
    Array.from({ length: count }).map(() => ({ id: uuidv4(), products: [] }));

  const createShelf = (): IShelf => ({
    id: uuidv4(),
    upperStack: { id: uuidv4(), type: "upper", columns: createColumns(11) },
    lowerStack: { id: uuidv4(), type: "lower", columns: createColumns(10) },
  });

  const createModule = (xStart: number, xEnd: number): IModule => ({
    id: uuidv4(),
    shelves: Array.from({ length: 3 }).map(createShelf), // 3 Prateleiras por módulo
    xStart,
    xEnd,
  });

  return {
    id: uuidv4(),
    modules: [
      createModule(0, 50),    // Módulo 1: intervalo 0-50
      createModule(51, 150),  // Módulo 2: intervalo 51-150
    ],
  };
};

export const GondolaProvider = ({ children }: { children: ReactNode }) => {
  const [gondola, setGondola] = useState<IGondola>(createMockGondola());

  const addProductToColumn = (
    shelfId: string,
    stackType: "upper" | "lower",
    columnId: string
  ) => {
    setGondola((prev) => {
      // Lógica imutável para atualizar a árvore profunda (Deep update)
      const newModules = prev.modules.map((mod) => {
        // Calcular a largura do módulo (intervalo)
        const moduleWidth = mod.xEnd - mod.xStart;
        
        return {
          ...mod,
          shelves: mod.shelves.map((shelf) => {
            if (shelf.id !== shelfId) return shelf;

            const targetStack =
              stackType === "upper" ? shelf.upperStack : shelf.lowerStack;

            const totalColumns = targetStack.columns.length;

            const updatedColumns = targetStack.columns.map((col, colIdx) => {
              if (col.id !== columnId) return col;

              // Calcular posição Y baseada no número de produtos existentes na coluna
              const yPosition = col.products.length;

              // Calcular posição X absoluta baseada no intervalo do módulo
              // Distribui as colunas uniformemente no intervalo do módulo
              const columnWidth = moduleWidth / totalColumns;
              const xPosition = Math.round(mod.xStart + (colIdx * columnWidth) + (columnWidth / 2));

              const newProduct: IProduct = {
                id: uuidv4(),
                name: "Prod",
                color: stackType === "upper" ? "#9c27b0" : "#d32f2f", // Roxo ou Vermelho visual
                xPosition,
                yPosition,
              };

              // Nota: Adicionamos SEMPRE ao final do array.
              // O CSS (column-reverse) cuidará da ordem visual na stack inferior.
              return { ...col, products: [...col.products, newProduct] };
            });

            return {
              ...shelf,
              [stackType === "upper" ? "upperStack" : "lowerStack"]: {
                ...targetStack,
                columns: updatedColumns,
              },
            };
          }),
        };
      });

      return { ...prev, modules: newModules };
    });
  };

  useEffect(() => {
    // Log detalhado mostrando produtos e seus módulos
    gondola.modules.forEach((module, modIdx) => {
      module.shelves.forEach((shelf, shelfIdx) => {
        // Upper stack
        shelf.upperStack.columns.forEach((col, colIdx) => {
          col.products.forEach((product) => {
            console.log(
              `Produto ${product.id.slice(0, 8)} | ` +
              `Módulo ${modIdx + 1} (${module.xStart}-${module.xEnd}) | ` +
              `Shelf ${shelfIdx + 1} | Upper Stack | Col ${colIdx} | ` +
              `X: ${product.xPosition}, Y: ${product.yPosition}`
            );
          });
        });
        
        // Lower stack
        shelf.lowerStack.columns.forEach((col, colIdx) => {
          col.products.forEach((product) => {
            console.log(
              `Produto ${product.id.slice(0, 8)} | ` +
              `Módulo ${modIdx + 1} (${module.xStart}-${module.xEnd}) | ` +
              `Shelf ${shelfIdx + 1} | Lower Stack | Col ${colIdx} | ` +
              `X: ${product.xPosition}, Y: ${product.yPosition}`
            );
          });
        });
      });
    });
  }, [gondola]);

  // Função para identificar o módulo baseado na posição X
  const getModuleByXPosition = (xPosition: number): IModule | undefined => {
    return gondola.modules.find(
      (module) => xPosition >= module.xStart && xPosition <= module.xEnd
    );
  };

  // Função para unificar shelves de todos os módulos
  const getUnifiedShelves = (): IUnifiedShelf[] => {
    // Determinar o número máximo de shelves entre todos os módulos
    const maxShelvesCount = Math.max(
      ...gondola.modules.map(mod => mod.shelves.length)
    );

    const unifiedShelves: IUnifiedShelf[] = [];

    // Para cada índice de shelf, combinar as colunas de todos os módulos
    for (let shelfIndex = 0; shelfIndex < maxShelvesCount; shelfIndex++) {
      const upperColumns: Array<{ column: IShelfColumn; moduleId: string; shelfId: string }> = [];
      const lowerColumns: Array<{ column: IShelfColumn; moduleId: string; shelfId: string }> = [];

      // Coletar colunas de cada módulo para este índice de shelf
      gondola.modules.forEach((module) => {
        const shelf = module.shelves[shelfIndex];
        if (shelf) {
          // Adicionar colunas do upper stack
          shelf.upperStack.columns.forEach((column) => {
            upperColumns.push({
              column,
              moduleId: module.id,
              shelfId: shelf.id,
            });
          });

          // Adicionar colunas do lower stack
          shelf.lowerStack.columns.forEach((column) => {
            lowerColumns.push({
              column,
              moduleId: module.id,
              shelfId: shelf.id,
            });
          });
        }
      });

      unifiedShelves.push({
        shelfIndex,
        upperColumns,
        lowerColumns,
      });
    }

    return unifiedShelves;
  };

  return (
    <GondolaContext.Provider value={{ gondola, addProductToColumn, getModuleByXPosition, getUnifiedShelves }}>
      {children}
    </GondolaContext.Provider>
  );
};

export const useGondola = () => {
  const context = useContext(GondolaContext);
  if (!context)
    throw new Error("useGondola must be used within a GondolaProvider");
  return context;
};
