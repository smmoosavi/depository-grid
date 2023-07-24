export type PaddingX = { x: number } | { left: number; right: number };
export type PaddingY = { y: number } | { top: number; bottom: number };
export type PaddingAll = { all: number };
export type Paddings = PaddingAll | (PaddingX & PaddingY);

/**
 * width in mm
 */
export type Width = { width: number } | { cols: number };
/**
 * height in mm
 * ratio: width / height
 */
export type Height = { height: number } | { rows: number } | { ratio: number };

export type PageLayout = {
  paddings: Paddings;
  width: Width;
  height: Height;
};
