import RootLayout from "@/layout/RootLayout";
import Error from "@/pages/Error/Error";
import Home from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    }
])

export default router;