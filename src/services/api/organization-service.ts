import { get, post, patch, del } from './http';
import BaseResponse from '@/interface/IBaseResponse';
import { IOrganization, IOrganizationMember, CreateOrganizationDTO } from '@/interface/IOrganization';

export const createOrganization = (body: CreateOrganizationDTO) =>
    post<BaseResponse<IOrganization>>('/organizations/create', body);

export const joinOrganization = (slug: string) =>
    post<BaseResponse<IOrganization>>(`/organizations/join/${slug}`, {});

export const switchOrganization = (organizationId: string) =>
    patch<BaseResponse<IOrganization>>(`/organizations/switch/${organizationId}`);

export const getMyOrganizations = () =>
    get<BaseResponse<IOrganization[]>>('/organizations/my');

export const getOrganizationMembers = (organizationId: string) =>
    get<BaseResponse<IOrganizationMember[]>>(`/organizations/${organizationId}/members`);

export const removeMember = (organizationId: string, userId: string) =>
    del<BaseResponse<string>>(`/organizations/${organizationId}/members/${userId}`);
