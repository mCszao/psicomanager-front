export default interface Address {
    id: string;
    street: string;
    district: string;
    zipcode: string;
    complement: string | null;
    number: string;
    state: string;
    abbreviation: string;
    city: string;
}