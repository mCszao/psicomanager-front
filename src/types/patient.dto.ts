import Address from "@/interface/IAddress";

type PatientDTO = {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    birthdayDate: string;
    zipcode: string;
    address?: Address;
}

export default PatientDTO;