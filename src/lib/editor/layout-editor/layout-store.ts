import type { PageLayout } from '$lib/editor/state/page-layout';
import { createLocalStorage } from '$lib/utils/storages';
import { derived, get } from 'svelte/store';

export type StoredPageLayout = {
  id: string;
  name: string;
  layout: PageLayout;
};

const PAGE_LAYOUTS_KEY = 'depository-grid.page-layouts';
const localLayoutsStorage = createLocalStorage(PAGE_LAYOUTS_KEY);
export const layouts = derived(localLayoutsStorage, (data): Array<StoredPageLayout> => {
  if (data) {
    return JSON.parse(data);
  }
  return [];
});

function generatedId(): string {
  return Math.random().toString(36).slice(2);
}

export function _loadLayouts(): StoredPageLayout[] {
  return get(layouts);
}
function _saveLayouts(layouts: StoredPageLayout[]) {
  localLayoutsStorage.set(JSON.stringify(layouts));
}

export function loadLayouts(): StoredPageLayout[] {
  return _loadLayouts();
}

export function saveLayout(name: string, layout: PageLayout) {
  const id = generatedId();
  const layouts = _loadLayouts();
  layouts.push({ id, name, layout });
  _saveLayouts(layouts);
}

export function deleteLayout(id: string) {
  const layouts = _loadLayouts();
  const newLayouts = layouts.filter((layout) => layout.id !== id);
  _saveLayouts(newLayouts);
}
