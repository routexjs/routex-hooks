import { IBody, ICtx, Methods, ICtxData, ICtxProviders } from "routex";
import { getCurrentCtx } from "./execution";

export function useGetCtx(): ICtx {
  const currentCtx = getCurrentCtx();

  if (!currentCtx) {
    throw new Error("Ran Routex hook outside of hooksHandler");
  }

  return currentCtx;
}

export function useGetParam(param: string): string | undefined {
  const ctx = useGetCtx();

  return ctx.params[param];
}

export function useGetQuery(query: string): string | undefined {
  const ctx = useGetCtx();

  return ctx.query[query];
}

export function useGetHeader(header: string): string | string[] | undefined {
  const ctx = useGetCtx();

  return ctx.req.headers[header];
}

export function useGetAllData<T = {}>(): ICtxData & T {
  const ctx = useGetCtx();

  return ctx.data as ICtxData & T;
}

export function useGetData<T = any>(key: string): T | undefined {
  const data = useGetAllData();

  return data[key];
}

export function useSetData<D = any>(key: string, value: D) {
  const ctx = useGetCtx();

  ctx.data[key] = value;
}

export function useGetAllProviders<T = {}>(): ICtxProviders & T {
  const ctx = useGetCtx();

  return ctx.providers as ICtxProviders & T;
}

export function useGetProvider<T = any>(key: string): T | undefined {
  const providers = useGetAllProviders();

  return providers[key];
}

export function useGetMethod(): Methods {
  const ctx = useGetCtx();

  return ctx.method;
}

export function useSetStatusCode(statusCode: number) {
  const ctx = useGetCtx();

  ctx.statusCode = statusCode;
}

export function useSetBody(body: IBody) {
  const ctx = useGetCtx();

  ctx.body = body;
}
