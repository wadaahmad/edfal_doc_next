import { DefaultUser, DefaultSession } from 'next-auth';
declare module 'next-auth' {
    interface OauthToken {
        expires_in: number,
        token_type: string,
        access_token: string,
        refresh_token: string
    }
    interface UserDetail {

    }
    interface Session extends DefaultSession {
        token?: OauthToken,
        user_detail?: UserDetail
    }
    interface User extends DefaultUser {
        token?: OauthToken,
        user_detail?: UserDetail
    }
}