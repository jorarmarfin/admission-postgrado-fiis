import {UserApplications, UserDashboard} from "@/components";

export const metadata = {
    title: "Test Page",
    description: "This is the Test page",
}
export default function TestPage() {
    return (
       <>
        <h1>Test Page</h1>
           <UserDashboard />
           <hr/>
           <UserApplications/>
           <hr/>
       </>
    );
}