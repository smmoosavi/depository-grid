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
  id: string;
  cell: CellLabel;
  row: RowLabel;
  table: TableLabel;
};

export type Group = {
  kind: 'group';
  id: ItemId;
  tables: TablePattern;
  rows: RowPattern;
  cells: CellPattern;
};

export type EditorItem = Group;

export function group(tables: TablePattern, rows: RowPattern, cells: CellPattern): Group {
  const id = nanoid(6);
  return { kind: 'group', id, tables, rows, cells };
}

export function serializeGroup(group: Group): string {
  const tables = itemsToString(group.tables.items);
  const rows = itemsToString(group.rows.items);
  const cells = itemsToString(group.cells.items);
  return `${tables}/${rows}/${cells}`;
}

export function serializeItem(item: EditorItem): string {
  switch (item.kind) {
    case 'group':
      return serializeGroup(item);
  }
}

export function groupLabel(group: Group): string {
  const tables = itemsToString(group.tables.items);
  const rows = itemsToString(group.rows.items);
  const cells = itemsToString(group.cells.items);
  return `${tables}/${rows}/${cells}`;
}

export function itemLabel(item: EditorItem): string {
  switch (item.kind) {
    case 'group':
      return groupLabel(item);
  }
}

export function getCellsOfGroup(group: Group): Cell[] {
  const cells: Cell[] = [];
  for (const table of group.tables.expanded) {
    for (const row of group.rows.expanded) {
      for (const cell of group.cells.expanded) {
        const id = group.id + '/' + table + '/' + row + '/' + cell;
        cells.push({ kind: 'cell', id, cell, row, table });
      }
    }
  }
  return cells;
}
export function getCellsOfItem(item: EditorItem): Cell[] {
  switch (item.kind) {
    case 'group':
      return getCellsOfGroup(item);
  }
}

export function getCellOfItems(items: EditorItem[]): Cell[] {
  const cells: Cell[] = [];
  for (const item of items) {
    cells.push(...getCellsOfItem(item));
  }
  return cells;
}
