import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
route('board/:boardId', 'routes/Board.tsx'),
] satisfies RouteConfig;
