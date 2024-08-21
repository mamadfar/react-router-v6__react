import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./routes/Root.tsx";
import ErrorPage from "./routes/ErrorPage.tsx";
import Contact from "./routes/Contact.tsx";
import EditContact from "./routes/EditContact.tsx";
import DestroyContact from "./routes/DestroyContact.tsx";
import {loader as rootLoader, action as rootAction} from "./routes/Root.tsx";
import {loader as contactLoader, action as contactAction} from "./routes/Contact.tsx";
import {action as editContactAction} from "./routes/EditContact.tsx";
import {action as destroyContactAction} from "./routes/DestroyContact.tsx";
import Index from "./routes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                errorElement: <ErrorPage/>,
                children: [
                    { index: true, element: <Index /> }, //? When there is no match, this will be rendered so we don't need to specify the path property.
                    {
                        path: "contacts/:contactId",
                        element: <Contact/>,
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        loader: contactLoader,
                        action: contactAction
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
            }
        ]
    },
])

function App() {

    document.title = "React Router Contacts"

    return <RouterProvider router={router}/>
}

export default App
