export interface IProduct {
  id: string;
  name: string;
  color: string;
  xPosition: number;
  yPosition: number;
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
  nextShelf?: IShelf; // se nao houver espaco na primeira shelf, vai para a nextShelf
}

export interface IModule {
  id: string;
  shelves: IShelf[];
  xStart: number;
  xEnd: number;
}

export interface IGondola {
  id: string;
  modules: IModule[];
}
