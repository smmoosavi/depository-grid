import type { Pattern } from './pattern';

export type ItemId = string;
export type CellLabel = number;
export type RowLabel = string;
export type TableLabel = number;

export type CellPattern = Pattern<CellLabel>;
export type RowPattern = Pattern<RowLabel>;
export type TablePattern = Pattern<TableLabel>;

export type Cell = {
  kind: 'cell';
  id: ItemId;
  table: TableLabel;
  row: RowLabel;
  cell: CellLabel;
};

export type Row = {
  kind: 'row';
  id: ItemId;
  table: TableLabel;
  row: RowLabel;
  cells: CellPattern;
};

export type Table = {
  kind: 'table';
  id: ItemId;
  table: TableLabel;
  rows: RowPattern;
  cells: CellPattern;
};

export type Group = {
  kind: 'group';
  id: ItemId;
  tables: TablePattern;
  rows: RowPattern;
  cells: CellPattern;
};

export type Item = Cell | Row | Table | Group;
