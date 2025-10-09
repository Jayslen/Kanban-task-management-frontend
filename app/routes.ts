import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout('./layouts/BasicLayout.tsx', [
        layout('./layouts/BoardLayout.tsx', [
            index("routes/home.tsx"),
            route('board/:boardId', 'routes/Board.tsx'),
        ]),
        route('login', 'routes/Login.tsx'),
    ]),
] satisfies RouteConfig;
