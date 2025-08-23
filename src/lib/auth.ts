import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email@email.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                return {
                    id: '1',
                    email: 'luis.mayta@gmail.com',
                    name: 'Luis Mayta',
                };
            }
        }),
    ],
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
    },
    secret: process.env.NEXTAUTH_SECRET,
};