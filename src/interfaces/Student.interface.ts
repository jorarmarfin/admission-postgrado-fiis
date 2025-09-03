export interface IStudent {
    id: number;
    code: string;
    last_name: string;
    first_name: string;
    personal_email: string;
    uni_email: string | null;
    phones: string;
    document_type: string;
    document_number: string;
    ubigeo_id: number | null;
    user_id: number;
    birth_date: string;
    payment_order_bank: string;
    university_id: number;
    undergraduate_major: string;
    with_invoice: boolean;
    ruc_number: string | null;
    business_name: string | null;
    registered_address: string | null;
    created_at: string;
    updated_at: string;
}
