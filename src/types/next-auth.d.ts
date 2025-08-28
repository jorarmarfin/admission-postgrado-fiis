import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { IUser } from "@/interfaces";

declare module "next-auth" {
    interface Session extends DefaultSession {
        accessToken?: string;
        userData?: IUser;
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            roles?: string[];
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        token?: string;
        roles?: string[];
        userData?: IUser;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        accessToken?: string;
        roles?: string[];
        userId?: string;
        userData?: IUser;
    }
}
