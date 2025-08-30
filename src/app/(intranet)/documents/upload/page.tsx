import {DocumentsUploadForm} from "@/components";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

export default async function DocumentsUploadPage() {
    const session = await getServerSession(authOptions);
    return <DocumentsUploadForm token={session?.accessToken??''} />;
}