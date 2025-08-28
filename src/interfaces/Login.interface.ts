// Interface para las credenciales de login
export interface ILoginRequest {
    email: string;
    password: string;
}

// Interface para el pivot de roles
export interface IRolePivot {
    model_type: string;
    model_id: number;
    role_id: number;
}

// Interface para un rol completo
export interface IRole {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    pivot: IRolePivot;
}

// Interface para el usuario que viene en la respuesta
export interface IUser {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles: IRole[];
}

// Interface para la respuesta completa del login
export interface ILoginResponse {
    token: string;
    user: IUser;
    role: string[];
    message: string;
}
