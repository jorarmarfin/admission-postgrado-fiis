export interface IAcademicPeriod {
    id: number;
    name: string;
    active: boolean;
    admission: boolean;
}

export interface IAcademicPeriodResponse<T> {
    success: boolean;
    data: IAcademicPeriod
    message?: string;
}
