export type PaddingX = { x: number } | { left: number } | { right: number };
export type PaddingY = { y: number } | { top: number } | { bottom: number };
export type PaddingAll = { all: number };
export type PaddingConfig = PaddingAll | (PaddingX & PaddingY);
export type Padding = { top: number; right: number; bottom: number; left: number };

/**
 * width in mm
 */
export type Width = { width: number } | { cols: number };
/**
 * height in mm
 * ratio: width / height
 */
export type Height = { height: number } | { rows: number } | { ratio: number };

export type Size = {
  width: number;
  height: number;
};

export type PageLayout = {
  cell: {
    width: Width;
    height: Height;
  };
  page: {
    padding: PaddingConfig;
    width: number;
    height: number;
    fontSize: number;
  };
};

export function getPagePadding(config: PaddingConfig): Padding {
  const padding: Padding = { top: 0, right: 0, bottom: 0, left: 0 };
  if ('all' in config) {
    padding.top = config.all;
    padding.right = config.all;
    padding.bottom = config.all;
    padding.left = config.all;
  }
  if ('x' in config) {
    padding.right = config.x;
    padding.left = config.x;
  }
  if ('left' in config) {
    padding.left = config.left;
  }
  if ('right' in config) {
    padding.right = config.right;
  }
  if ('y' in config) {
    padding.top = config.y;
    padding.bottom = config.y;
  }
  if ('top' in config) {
    padding.top = config.top;
  }
  if ('bottom' in config) {
    padding.bottom = config.bottom;
  }
  return padding;
}

export function getPageInnerSize(layout: PageLayout): Size {
  const padding = getPagePadding(layout.page.padding);
  const width = layout.page.width - padding.left - padding.right;
  const height = layout.page.height - padding.top - padding.bottom;
  return { width, height };
}

export function getCellSize(layout: PageLayout): Size {
  const { width: pageInnerWidth, height: pageInnerHeight } = getPageInnerSize(layout);
  let cellWith = 0;
  if ('width' in layout.cell.width) {
    cellWith = layout.cell.width.width;
  }
  if ('cols' in layout.cell.width) {
    cellWith = pageInnerWidth / layout.cell.width.cols;
  }
  let cellHeight = 0;
  if ('height' in layout.cell.height) {
    cellHeight = layout.cell.height.height;
  }
  if ('rows' in layout.cell.height) {
    cellHeight = pageInnerHeight / layout.cell.height.rows;
  }
  if ('ratio' in layout.cell.height) {
    cellHeight = cellWith / layout.cell.height.ratio;
  }
  return { width: cellWith, height: cellHeight };
}
