export interface Product {
  id: string;
  name: string;
  color: string;
}

export interface ShelfColumn {
  id: string;
  products: Product[];
}

export interface ShelfStack {
  id: string;
  type: "upper" | "lower";
  columns: ShelfColumn[];
}

export interface Shelf {
  id: string;
  upperStack: ShelfStack;
  lowerStack: ShelfStack;
}

export interface Module {
  id: string;
  shelves: Shelf[];
}

export interface Gondola {
  id: string;
  modules: Module[];
}
