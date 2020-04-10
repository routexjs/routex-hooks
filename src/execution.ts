import { ICtx } from "routex";

let currentCtx: ICtx | undefined;

export function setCurrentCtx(ctx: typeof currentCtx) {
  currentCtx = ctx;
}

export function getCurrentCtx() {
  return currentCtx;
}
