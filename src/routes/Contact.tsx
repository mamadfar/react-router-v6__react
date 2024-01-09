import {FormEvent} from 'react';
import {Form, useLoaderData} from "react-router-dom";
import {getContact} from "../contacts.ts";

export type Contact_Type = {first: string, last: string, avatar: string, twitter: string, notes: string, favorite: boolean}

export const loader = async ({params}: {params: {contactId: string}}) => {
    const contact = await getContact(params.contactId);
    return {contact};
}

const Contact = () => {

    // const contact: Contact_Type = {
    //     first: "Your",
    //     last: "Name",
    //     avatar: "https://placekitten.com/g/200/200",
    //     twitter: "your_handle",
    //     notes: "Some notes",
    //     favorite: true,
    // };

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
    const favorite = contact.favorite;
    return (
        <Form method="post">
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
        </Form>
    );
}

export default Contact;
