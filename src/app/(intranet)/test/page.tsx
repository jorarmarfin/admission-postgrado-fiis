import {UserApplications, UserDashboard} from "@/components";


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