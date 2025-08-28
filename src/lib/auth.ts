import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { loginService } from "@/services";


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

                try {
                    // Llamar al servicio de login
                    const response = await loginService.login({
                        email: credentials.email,
                        password: credentials.password
                    });

                    // Retornar los datos del usuario para NextAuth
                    return {
                        id: response.user.id.toString(),
                        email: response.user.email,
                        name: response.user.name,
                        token: response.token,
                        roles: response.role,
                        userData: response.user // Guardamos toda la info del usuario
                    };
                } catch (error) {
                    console.error("Error en autenticación:", error);
                    return null;
                }
            }
        }),
    ],
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
    },
    callbacks: {
        async jwt({ token, user }) {
            // Persiste la información del usuario en el JWT
            if (user) {
                token.accessToken = (user as any).token;
                token.roles = (user as any).roles;
                token.userId = user.id;
                token.userData = (user as any).userData;
            }
            return token;
        },
        async session({ session, token }) {
            // Envía la información al cliente
            if (session.user) {
                session.user.id = token.userId as string;
                session.user.roles = token.roles as string[];
            }
            session.accessToken = token.accessToken as string;
            session.userData = token.userData as any;
            return session;
        },
    },
    events: {
        async signOut({ token }) {
            // Llamar al API de logout cuando se cierre sesión
            if (token?.accessToken) {
                try {
                    await loginService.logout(token.accessToken as string);
                    console.log('Logout exitoso en el servidor');
                } catch (error) {
                    console.error('Error al hacer logout en el servidor:', error);
                }
            }
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};