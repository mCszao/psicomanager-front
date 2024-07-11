import Address from "./IAddress";
import Document from "./IDocument";
import Schedule from "./ISchedule";
export default interface Patient {
    id: string;
    name: string;
    email: string;
    phone: string;
    birthdayDate: string;
    address: Address[];
    schedules: Schedule[];
    documents: Document[];
}