export interface IAcademicPeriod {
    id: number;
    name: string;
    active: boolean;
    admission: boolean;
}

export interface ApiResponse<T> {
    status: string;
    data: T;
    message?: string;
}

export interface IAcademicPeriodDetail {
    id: number;
    name: string;
    admission: boolean;
    active: boolean;
}
