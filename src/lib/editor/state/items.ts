import { nanoid } from 'nanoid';
import { itemsToString } from './pattern/pattern';
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

export function serializeCell(cell: Cell): string {
  return `${cell.table}/${cell.row}/${cell.cell}`;
}

export function serializeRow(row: Row): string {
  const cells = itemsToString(row.cells.items);
  return `${row.table}/${row.row}/${cells}`;
}

export function serializeTable(table: Table): string {
  const rows = itemsToString(table.rows.items);
  const cells = itemsToString(table.cells.items);
  return `${table.table}/${rows}/${cells}`;
}

export function serializeGroup(group: Group): string {
  const tables = itemsToString(group.tables.items);
  const rows = itemsToString(group.rows.items);
  const cells = itemsToString(group.cells.items);
  return `${tables}/${rows}/${cells}`;
}

export function serializeItem(item: Item): string {
  switch (item.kind) {
    case 'cell':
      return serializeCell(item);
    case 'row':
      return serializeRow(item);
    case 'table':
      return serializeTable(item);
    case 'group':
      return serializeGroup(item);
  }
}

export function cellLabel(cell: Cell): string {
  return `${cell.table}/${cell.row}/${cell.cell}`;
}

export function rowLabel(row: Row): string {
  return `${row.table}/${row.row}`;
}

export function tableLabel(table: Table): string {
  return `${table.table}`;
}

export function groupLabel(group: Group): string {
  const tables = itemsToString(group.tables.items);
  const rows = itemsToString(group.rows.items);
  const cells = itemsToString(group.cells.items);
  return `${tables}/${rows}/${cells}`;
}

export function itemLabel(item: Item): string {
  switch (item.kind) {
    case 'cell':
      return cellLabel(item);
    case 'row':
      return rowLabel(item);
    case 'table':
      return tableLabel(item);
    case 'group':
      return groupLabel(item);
  }
}
