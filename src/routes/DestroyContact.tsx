import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ params }: {params: {contactId: string}}) {
    await deleteContact(params.contactId);
    return redirect("/");
}
const DestroyContact = () => {
    return null;
};

export default DestroyContact;
