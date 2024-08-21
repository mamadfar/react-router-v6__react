// noinspection t

import {
    Form,
    NavLink,
    Outlet,
    redirect,
    useLoaderData,
    useNavigation,
    LoaderFunction,
    ActionFunction, useSubmit
} from "react-router-dom";
import {createContact, getContacts} from "../contacts.ts";
import {ChangeEvent, useEffect} from "react";

export const loader: LoaderFunction = async ({request}) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    const contacts = await getContacts(query || '');
    return {contacts, query};
}

export const action: ActionFunction = async () => {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {

    const {contacts, query} = useLoaderData() || {contacts: [], query: ''};
    const navigation = useNavigation();
    const submit = useSubmit();

    // const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q"); //? It's equivalent to navigation.state === 'loading'

    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const isFirstSearch = query === null;
        submit(e.currentTarget.form, {
            replace: !isFirstSearch,
        });
    }

    useEffect(() => {
        (document.getElementById('q') as HTMLInputElement).value = query;
        console.log('query', query)
    }, [query])

    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <Form id="search-form" role="search">
                        <input id="q" aria-label="Search contacts" placeholder="Search" name="q" type="search" defaultValue={query} onChange={onSearch}
                               className={navigation.state === 'loading' ? "loading" : ""}
                        />
                        <div id="search-spinner" aria-hidden hidden={navigation.state !== 'loading'}/>
                        <div className="sr-only" aria-live="polite"></div>
                    </Form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact) => (
                                <li key={contact.id}>
                                    <NavLink to={`contacts/${contact.id}`} className={({
                                                                                           isActive,
                                                                                           isPending
                                                                                       }) => isActive ? 'active' : isPending ? 'pending' : ''}>
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {contact.favorite && <span>★</span>}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                    )}
                </nav>
            </div>
            <div id="detail" className={navigation.state === 'loading' ? 'loading' : ''}>
                <Outlet/>
            </div>
        </>
    )
}