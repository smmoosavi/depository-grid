import type { Cell } from '$lib/editor/state/editor-items';
import { getCellSize, getPageInnerSize, getPagePadding } from '$lib/editor/state/page-layout';
import type { PageLayout } from '$lib/editor/state/page-layout';

export type { Cell };
export type PrintItem = Cell;
export type Positioned<I> = {
  item: I;
  x: number;
  y: number;
  width: number;
  height: number;
};
export type Page = {
  items: Array<Positioned<PrintItem>>;
};

export function placeItems(items: Array<PrintItem>, layout: PageLayout): Page[] {
  const pages: Page[] = [];

  const { width: pageWidth, height: pageHeight } = getPageInnerSize(layout);
  const padding = getPagePadding(layout.page.padding);
  const { width: cellWidth, height: cellHeight } = getCellSize(layout);

  let page: Page = { items: [] };
  const x0 = padding.left;
  const y0 = padding.top;

  let x = x0;
  let y = y0;

  for (const item of items) {
    const positionedItem: Positioned<PrintItem> = {
      item,
      x,
      y,
      width: cellWidth,
      height: cellHeight,
    };
    page.items.push(positionedItem);
    x += cellWidth;
    if (x + cellWidth > pageWidth + x0) {
      x = x0;
      y += cellHeight;
      if (y + cellHeight > pageHeight + y0) {
        pages.push(page);
        page = { items: [] };
        y = y0;
      }
    }
  }
  if (page.items.length > 0) {
    pages.push(page);
  }
  if (pages.length === 0) {
    pages.push({ items: [] });
  }
  return pages;
}
