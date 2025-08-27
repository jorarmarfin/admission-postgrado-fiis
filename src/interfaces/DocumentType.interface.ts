export interface IDocumentType {
    id: string;
    name: string;
}

export interface IDocumentTypesResponse {
    status: "success";
    data: IDocumentType[];
}
