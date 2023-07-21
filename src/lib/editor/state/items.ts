import { nanoid } from 'nanoid';
import type { Pattern } from './pattern/pattern';

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
export function cell(table: TableLabel, row: RowLabel, cell: CellLabel): Cell {
  const id = nanoid(6);
  return { kind: 'cell', id, table, row, cell };
}

export function row(table: TableLabel, row: RowLabel, cells: CellPattern): Row {
  const id = nanoid(6);
  return { kind: 'row', id, table, row, cells };
}

export function table(table: TableLabel, rows: RowPattern, cells: CellPattern): Table {
  const id = nanoid(6);
  return { kind: 'table', id, table, rows, cells };
}

export function group(tables: TablePattern, rows: RowPattern, cells: CellPattern): Group {
  const id = nanoid(6);
  return { kind: 'group', id, tables, rows, cells };
}
