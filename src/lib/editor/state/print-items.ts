import type { Cell } from '$lib/editor/state/editor-items';
import { getCellSize, getPageInnerSize, getPagePadding } from '$lib/editor/state/page-layout';
import type { PageLayout } from '$lib/editor/state/page-layout';

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
  let x = padding.left;
  let y = padding.top;

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
    if (x + cellWidth > pageWidth) {
      x = padding.left;
      y += cellHeight;
      if (y + cellHeight > pageHeight) {
        pages.push(page);
        page = { items: [] };
        y = padding.top;
      }
    }
  }

  return pages;
}
