import {ActionFunction, redirect} from "react-router-dom";
import { deleteContact } from "../contacts";

export const action: ActionFunction = async ({ params }) => {
    await deleteContact(params.contactId || '');
    return redirect("/");
}
const DestroyContact = () => {
    return null;
};

export default DestroyContact;
