// Interfaces para documentos

// Interface para un documento de programa
export interface IProgramDocument {
    id: number;
    program_id: number;
    document_name: string;
    document_path: string;
    document_type: string;
    document_size: string;
    created_at: string;
    updated_at: string;
    full_url: string;
}

// Interface para la respuesta de documentos de programa
export interface IProgramDocumentsResponse {
    status: string;
    program: string;
    data: IProgramDocument[];
}

// Interface para la respuesta de subida de documento
export interface IUploadDocumentResponse {
    status: string;
    message: string;
    data: {
        path: string;
        document_name: string;
    };
}

// Interface para un documento del solicitante
export interface IApplicantDocument {
    id: number;
    name: string;
    file: string;
    file_url: string;
    file_size: string;
    file_type: string;
    upload_date: string | null;
    applicant_id: number;
}

// Interface para la respuesta de documentos del solicitante
export interface IApplicantDocumentsResponse {
    status: string;
    data: IApplicantDocument[];
}
