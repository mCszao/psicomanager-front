export type MemberRole = 'OWNER' | 'ADMIN' | 'MEMBER';

export interface IOrganization {
    id: string;
    name: string;
    slug: string;
    myRole: MemberRole;
    createdAt: string;
}

export interface IOrganizationMember {
    userId: string;
    username: string;
    email: string;
    role: MemberRole;
    joinedAt: string;
}

export interface CreateOrganizationDTO {
    name: string;
}
