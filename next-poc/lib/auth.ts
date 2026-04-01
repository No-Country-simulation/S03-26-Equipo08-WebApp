import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { organization } from "better-auth/plugins";
import { db } from "./db";
import * as schema from "./db/schema";
import { sendInvitationEmail } from "./mail";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: schema.users,
            session: schema.sessions,
            account: schema.accounts,
            verification: schema.verifications,
            organization: schema.organizations,
            member: schema.members,
            invitation: schema.invitations,
        }
    }),

    plugins: [
        nextCookies(),
        organization({
            allowUserToCreateOrganization: async (user) => {
                // Owners y super_admins pueden crear organizaciones
                const role = (user as { role?: string }).role;
                return role === "owner" || role === "super_admin";
            },
            organizationLimit: 5,
            membershipLimit: 100,
            invitationExpiresIn: 60 * 60 * 24 * 7, // 7 días
            creatorRole: "owner",
            sendInvitationEmail: async (data) => {
                const { email, organization, inviter, invitation } = data;
                const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${invitation.id}`;
                await sendInvitationEmail({
                    to: email,
                    organizationName: organization.name,
                    inviterName: inviter.user.name,
                    role: invitation.role,
                    inviteUrl,
                });
            },
        }),
    ],

    emailAndPassword: {
        enabled: true,
    },
});
