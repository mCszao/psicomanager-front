import { Metadata } from "next";

export default function metadataFactory(title: string) {
    return  {
        title: `${title} | Agenda Psico`
    } as Metadata
}