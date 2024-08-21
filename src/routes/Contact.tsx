import {FormEvent} from 'react';
import {ActionFunction, Form, LoaderFunction, useFetcher, useLoaderData} from "react-router-dom";
import {getContact, updateContact} from "../contacts.ts";

export type Contact_Type = {first: string, last: string, avatar: string, twitter: string, notes: string, favorite: boolean}

export const loader: LoaderFunction = async ({params}) => {
    const contact = await getContact(params.contactId || '');
    if (!contact) {
        throw new Response('', {
            status: 404,
            statusText: 'Contact Not Found'
        })
        // throw new Error('Contact Not Found')
    }
    return {contact};
}

export const action: ActionFunction = async ({request, params}) => {
    const formData = await request.formData();
    return updateContact(params.contactId || '', {
        favorite: formData.get('favorite') === 'true'
    })
}

const Contact = () => {

    const {contact} = useLoaderData();

    const submit = (e: FormEvent<HTMLFormElement>) => {
        if (!confirm("Please confirm you want to delete this record.")) {
            e.preventDefault()
        }
    }

    return (
        <div id="contact">
            <div>
                <img src={contact.avatar} alt={contact.first} key={contact.avatar}/>
            </div>
            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name!</i>
                    )}&nbsp;
                    <Favorite contact={contact}/>
                </h1>
                {contact.twitter && (
                    <p>
                        <a
                            target="_blank"
                            href={`https://twitter.com/${contact.twitter}`}
                        >
                            {contact.twitter}
                        </a>
                    </p>
                )}
                {contact.notes && <p>{contact.notes}</p>}
                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form method="post" action="destroy" onSubmit={submit}>
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

const Favorite = ({contact}: {contact: Contact_Type}) => {

    const fetcher = useFetcher();

    const favorite = fetcher.formData ? fetcher.formData?.get('favorite') === 'true' : contact.favorite;

    return (
        <fetcher.Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    );
}

export default Contact;
