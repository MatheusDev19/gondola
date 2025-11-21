export interface IProduct {
  id: string;
  name: string;
  color: string;
}

export interface IShelfColumn {
  id: string;
  products: IProduct[];
}

export interface IShelfStack {
  id: string;
  type: "upper" | "lower";
  columns: IShelfColumn[];
}

export interface IShelf {
  id: string;
  upperStack: IShelfStack;
  lowerStack: IShelfStack;
}

export interface IModule {
  id: string;
  shelves:  IShelf[];
}

export interface IGondola {
  id: string;
  modules: IModule[];
}
