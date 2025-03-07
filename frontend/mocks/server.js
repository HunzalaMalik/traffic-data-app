import { setupServer } from "msw/node";
import { rest } from "msw";

export const server = setupServer(
  rest.get("/api/v1/country_traffics", (req, res, ctx) => {
    return res(ctx.json([{ id: 1, country: "USA", count: 100 }]));
  })
);
