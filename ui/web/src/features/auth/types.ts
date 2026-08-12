export type UserRole = 'CLIENT' | 'ADMIN'

export interface User {
    _id:string,
    name:string,
    email:string,
    role:UserRole
}