import { Handler, IBody, ICtx } from "routex";
import { setCurrentCtx } from "./execution";

type HooksHandler =
  | Handler
  | (() => Promise<void> | Promise<IBody> | void | IBody);

export function hooksHandler(handler: HooksHandler): Handler {
  return async (ctx: ICtx): Promise<IBody | void> => {
    setCurrentCtx(ctx);

    const result = await handler(ctx);

    setCurrentCtx(undefined);

    return result;
  };
}
