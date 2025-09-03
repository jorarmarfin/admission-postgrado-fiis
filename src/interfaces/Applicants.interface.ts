import {IAcademicPeriodDetail, IProgramDetail, IStudent} from "@/interfaces/Application.interface";

export interface IApplicantDetails {
    id: number;
    student_id: number;
    academic_period_id: number;
    program_id: number;
    prospecto: boolean;
    admission: boolean;
    is_accepted: boolean;
    created_at: string;
    updated_at: string;
    student: IStudent;
    program: IProgramDetail;
    academic_period: IAcademicPeriodDetail;
}
export interface IApplicantDetailsResponse{
    status: "success";
    data: IApplicantDetails;
}
