<script lang="ts">
  import { parseNumerPattern, parseStringPattern } from '$lib/editor/state';
  import { type Group, group as createGroup } from '$lib/editor/state/items';
  import { numberItemsToString, stringItemsToString } from '$lib/editor/state/pattern/pattern';
  import { getStore, updateItem } from '$lib/editor/state/store';
  import { transformResult } from '$lib/utils/zod-utils';
  import { z, type ZodIssue } from 'zod';

  export let group: Group;

  let tables = numberItemsToString(group.tables.items);
  let rows = stringItemsToString(group.rows.items);
  let cols = numberItemsToString(group.cells.items);
  let errors: ZodIssue[] = [];

  const schema = z.object({
    tables: z.string().transform((v, ctx) => {
      const res = parseNumerPattern(v);
      return transformResult(res, ctx);
    }),
    rows: z.string().transform((v, ctx) => {
      const res = parseStringPattern(v);
      return transformResult(res, ctx);
    }),
    cols: z.string().transform((v, ctx) => {
      const res = parseNumerPattern(v);
      return transformResult(res, ctx);
    }),
  });

  let tablesInput: HTMLInputElement | null = null;
  let rowsInput: HTMLInputElement | null = null;
  let colsInput: HTMLInputElement | null = null;
  $: inputs = [tablesInput, rowsInput, colsInput];
  const getNext = (input: HTMLInputElement): HTMLInputElement | null => {
    const index = inputs.indexOf(input);
    return inputs[(index + 1) % inputs.length];
  };

  const onPress = (e: KeyboardEvent) => {
    // on press / focus on next input
    if (e.key === '/') {
      e.preventDefault();
      const next = getNext(e.target as HTMLInputElement);
      next?.focus();
    }
  };

  const onSubmit = (e: SubmitEvent) => {
    const form = new FormData(e.target as HTMLFormElement);
    const res = schema.safeParse(Object.fromEntries(form.entries()));
    if (!res.success) {
      errors = res.error.errors;
      return;
    }
    errors = [];
    const { tables, rows, cols } = res.data;
    const g = createGroup(tables, rows, cols);
    const id = group.id;
    dispatch(updateItem(id, { ...g, id }));
  };

  const store = getStore();
  const { dispatch } = store;
</script>

<form on:submit|preventDefault={onSubmit}>
  <input
    type="text"
    name="tables"
    class="input input-ghost max-w-[128px]"
    placeholder="tables"
    value={tables}
    bind:this={tablesInput}
    on:keydown={onPress}
  />
  /
  <input
    type="text"
    name="rows"
    class="input input-ghost max-w-[128px]"
    placeholder="rows"
    value={rows}
    bind:this={rowsInput}
    on:keydown={onPress}
  />
  /
  <input
    type="text"
    name="cols"
    class="input input-ghost max-w-[128px]"
    placeholder="columns"
    value={cols}
    bind:this={colsInput}
    on:keydown={onPress}
  />

  <button type="submit" class="btn btn-success btn-outline">Save</button>

  <br />
  {#each errors as error}
    <p class="text-error">{error.path}: {error.message}</p>
  {/each}
</form>
