/* eslint-disable react-refresh/only-export-components */
// GondolaContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import { v4 as uuidv4 } from "uuid"; // Instale: npm i uuid @types/uuid
import type { IGondola, IModule, IProduct, IShelf } from "../interface";

interface GondolaContextType {
  gondola: IGondola;
  addProductToColumn: (
    shelfId: string,
    stackType: "upper" | "lower",
    columnId: string
  ) => void;
}

const GondolaContext = createContext<GondolaContextType | undefined>(undefined);

// --- Helper para criar dados iniciais (Mock) ---
const createMockGondola = (): IGondola => {
  const createColumns = (count: number) =>
    Array.from({ length: count }).map(() => ({ id: uuidv4(), products: [] }));

  const createShelf = (): IShelf => ({
    id: uuidv4(),
    upperStack: { id: uuidv4(), type: "upper", columns: createColumns(10) }, // Ex: 10 colunas
    lowerStack: { id: uuidv4(), type: "lower", columns: createColumns(10) },
  });

  const createModule = (): IModule => ({
    id: uuidv4(),
    shelves: Array.from({ length: 3 }).map(createShelf), // 3 Prateleiras por módulo
  });

  return {
    id: uuidv4(),
    modules: [createModule(), createModule()], // 2 Módulos
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
      const newModules = prev.modules.map((mod) => ({
        ...mod,
        shelves: mod.shelves.map((shelf) => {
          if (shelf.id !== shelfId) return shelf;

          const targetStack =
            stackType === "upper" ? shelf.upperStack : shelf.lowerStack;

          const updatedColumns = targetStack.columns.map((col) => {
            if (col.id !== columnId) return col;

            const newProduct: IProduct = {
              id: uuidv4(),
              name: "Prod",
              color: stackType === "upper" ? "#9c27b0" : "#d32f2f", // Roxo ou Vermelho visual
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
      }));

      return { ...prev, modules: newModules };
    });
  };

  return (
    <GondolaContext.Provider value={{ gondola, addProductToColumn }}>
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
