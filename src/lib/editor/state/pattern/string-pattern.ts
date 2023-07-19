import { parse, PeggySyntaxError } from '$lib/editor/state/parser/char-pattern-parser';
import { pattern } from '$lib/editor/state/pattern/pattern';
import type { Pattern } from '$lib/editor/state/pattern/pattern';
import { err, ok, type Result } from '$lib/utils/result';

export function parseStringPattern(value: string): Result<Pattern<string>, PeggySyntaxError> {
  try {
    const items = parse(value);
    return ok(pattern<string>(items));
  } catch (e) {
    if (e instanceof PeggySyntaxError) {
      return err(e);
    }
    throw e;
  }
}
