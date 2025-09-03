export interface IProgramType {
    id: number;
    name: string;
    active: boolean | null;
}

export interface IProgram {
    id: number;
    uuid: string;
    name: string;
    description: string;
    program_type_id: number;
    program_types: IProgramType;
}

export interface IProgramDetail {
    id: number;
    uuid: string;
    name: string;
    description: string;
    program_type_id: number;
}