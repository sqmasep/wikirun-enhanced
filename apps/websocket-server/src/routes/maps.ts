import { vValidator } from "@hono/valibot-validator";
import { mapSchema } from "@repo/validation/maps";
import { Hono } from "hono";

const mapsRoutes = new Hono()
  .get("/", c => {
    return c.json("Hello, world!");
  })
  .get("/:mapId", c => {
    const mapId = c.req.param("mapId");

    return c.json({
      mapId,
    });
  })
  .post("/new", vValidator("json", mapSchema), async c => {
    const { name, description, rounds, tags } = c.req.valid("json");
  });

export default mapsRoutes;

// const rooms = {
//   roomId123: {
//     state: "ongoing",
//     rounds: [
//       ["url1", "url2"],
//       ["url3", "url4"],
//     ],
//     players: [
//       {
//         id: "player1",
//         health: "",
//         history: [
//           ["url1", "url xi jingping", "url2"],
//           [
//             "url3",
//             "urlmongolie",
//             "url johnny" /* yaura des modifs dans pas longtemps */,
//           ],
//         ],
//       },
//       {
//         id: "player2",
//         health: "",
//         history: [
//           ["url1", "url xi jingping", "url2"],
//           [
//             "url3",
//             "urlmongolie",
//             "url johnny" /* yaura des modifs dans pas longtemps */,
//           ],
//         ],
//       },
//     ],
//   },
// };

// ws.on("linkClick", link => {});
