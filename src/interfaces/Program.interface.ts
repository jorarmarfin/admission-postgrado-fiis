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

// Interfaces para documentos del programa
export interface IProgramDocument {
    id: number;
    program_id: number;
    document_name: string;
    document_path: string;
    document_type: string;
    created_at: string;
    updated_at: string;
    full_url: string;
}

export interface IProgramDocumentsResponse {
    status: "success";
    program: string;
    data: IProgramDocument[];
}
