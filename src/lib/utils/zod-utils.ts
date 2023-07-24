import type { Result } from '$lib/utils/result';
import { type RefinementCtx, z } from 'zod';

export type Error = { message: string };
export function transformResult<T, E extends Error>(res: Result<T, E>, ctx: RefinementCtx): T {
  if (res.isOk()) {
    return res.ok;
  }
  if (res.isErr()) {
    ctx.addIssue({
      code: 'custom',
      message: res.err.message,
      path: [],
    });
  }
  return z.NEVER;
}
