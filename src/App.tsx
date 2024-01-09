import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./routes/Root.tsx";
import ErrorPage from "./routes/ErrorPage.tsx";
import Contact from "./routes/Contact.tsx";
import EditContact from "./routes/EditContact.tsx";
import DestroyContact from "./routes/DestroyContact.tsx";
import {loader as rootLoader, action as rootAction} from "./routes/Root.tsx";
import {loader as contactLoader} from "./routes/Contact.tsx";
import {action as editContactAction} from "./routes/EditContact.tsx";
import {action as destroyContactAction} from "./routes/DestroyContact.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                path: "contacts/:contactId",
                element: <Contact/>,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                loader: contactLoader
            },
            {
                path: "contacts/:contactId/edit",
                element: <EditContact/>,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                loader: contactLoader,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                action: editContactAction
            },
            {
                path: "contacts/:contactId/destroy",
                element: <DestroyContact/>,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                action: destroyContactAction
            },
        ]
    },
])

function App() {

    return <RouterProvider router={router}/>
}

export default App
