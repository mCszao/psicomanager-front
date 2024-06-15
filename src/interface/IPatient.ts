import Address from "./IAddress";
export default interface Patient {
    id: string;
    name: string;
    email: string;
    phone: string;
    birthdayDate: string;
    address: Address[];
}