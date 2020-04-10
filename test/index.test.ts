import * as request from "supertest";
import { JsonBody, Routex } from "routex";
import { hooksHandler } from "../src";
import {
  useGetAllData,
  useGetAllProviders,
  useGetCtx,
  useGetData,
  useGetHeader,
  useGetMethod,
  useGetParam,
  useGetProvider,
  useGetQuery,
  useSetBody,
  useSetData,
  useSetStatusCode,
} from "../src/hooks";

test("useGetCtx", async () => {
  const app = new Routex();

  app.get(
    "/",
    hooksHandler(() => {
      const ctx = useGetCtx();

      return new JsonBody({ name: ctx.query.name });
    })
  );

  return request(app.handler)
    .get("/?name=john")
    .expect("Content-Type", /json/)
    .expect(`{"name":"john"}`)
    .expect(200);
});

test("useGetParam", async () => {
  const app = new Routex();

  app.get(
    "/:name",
    hooksHandler(() => {
      const name = useGetParam("name");

      return new JsonBody({ name });
    })
  );

  return request(app.handler)
    .get("/john")
    .expect("Content-Type", /json/)
    .expect(`{"name":"john"}`)
    .expect(200);
});

test("useGetQuery", async () => {
  const app = new Routex();

  app.get(
    "/",
    hooksHandler(() => {
      const name = useGetQuery("name");

      return new JsonBody({ name });
    })
  );

  return request(app.handler)
    .get("/?name=john")
    .expect("Content-Type", /json/)
    .expect(`{"name":"john"}`)
    .expect(200);
});

test("useGetHeader", async () => {
  const app = new Routex();

  app.get(
    "/",
    hooksHandler(() => {
      const name = useGetHeader("name");

      return new JsonBody({ name });
    })
  );

  return request(app.handler)
    .get("/")
    .set("name", "john")
    .expect("Content-Type", /json/)
    .expect(`{"name":"john"}`)
    .expect(200);
});

test("useGetData / useGetAllData / useSetData", async () => {
  const app = new Routex();

  app.get("/", [
    hooksHandler(() => {
      useSetData("name", "john");
    }),
    hooksHandler(() => {
      const name = useGetData("name");

      if (name !== useGetAllData().name) {
        throw new Error("Name doesn't match all");
      }

      return new JsonBody({ name });
    }),
  ]);

  return request(app.handler)
    .get("/")
    .expect("Content-Type", /json/)
    .expect(`{"name":"john"}`)
    .expect(200);
});

test("useGetProvider / useGetAllProvider", async () => {
  const app = new Routex();

  app.providers = {
    name() {
      return "john";
    },
  };

  app.get(
    "/",
    hooksHandler(() => {
      const name = useGetProvider("name")();

      if (name !== useGetAllProviders().name()) {
        throw new Error("Name doesn't match all");
      }

      return new JsonBody({ name });
    })
  );

  return request(app.handler)
    .get("/")
    .expect("Content-Type", /json/)
    .expect(`{"name":"john"}`)
    .expect(200);
});

test("useGetMethod", async () => {
  const app = new Routex();

  app.get(
    "/",
    hooksHandler(() => {
      const method = useGetMethod();

      return new JsonBody({ method });
    })
  );

  return request(app.handler)
    .get("/")
    .expect("Content-Type", /json/)
    .expect(`{"method":"get"}`)
    .expect(200);
});

test("useSetStatusCode", async () => {
  const app = new Routex();

  app.get(
    "/",
    hooksHandler(() => {
      useSetStatusCode(400);
    })
  );

  return request(app.handler).get("/").expect(400);
});

test("useSetBody", async () => {
  const app = new Routex();

  app.get(
    "/",
    hooksHandler(() => {
      useSetBody(new JsonBody({ name: "john" }));
    })
  );

  return request(app.handler)
    .get("/")
    .expect("Content-Type", /json/)
    .expect(`{"name":"john"}`)
    .expect(200);
});

it("fails when called out of handler", async () => {
  expect(() => useGetCtx()).toThrow();
});
