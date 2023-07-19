import { parse, PeggySyntaxError } from '$lib/editor/state/parser/num-pattern-parser';
import { pattern } from '$lib/editor/state/pattern/pattern';
import type { Pattern } from '$lib/editor/state/pattern/pattern';
import { err, ok, type Result } from '$lib/utils/result';

export function parseNumerPattern(value: string): Result<Pattern<number>, PeggySyntaxError> {
  try {
    const items = parse(value);
    return ok(pattern<number>(items));
  } catch (e) {
    if (e instanceof PeggySyntaxError) {
      return err(e);
    }
    throw e;
  }
}
