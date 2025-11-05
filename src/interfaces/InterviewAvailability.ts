export interface IInterviewAvailability {
    id: number;
    interviewer_start_at: string;
    interviewer_end_at: string;
    professor_name: string;
    academic_period_name: string;
    program_name: string;
    capacity: number;
    academic_period: null;
    program: null;
    professor: null;
    mode: string;
    location: string;
    meeting_link: string;
}