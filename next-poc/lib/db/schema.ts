import { pgTable, text, timestamp, boolean, integer, pgEnum, uuid } from "drizzle-orm/pg-core";

// --- ENUMS ---
export const roleEnum = pgEnum("user_role", ["admin", "editor", "visitor"]);
export const statusEnum = pgEnum("testimonial_status", ["pending", "approved", "rejected", "archived"]);
export const sourceEnum = pgEnum("testimonial_source", ["manual", "visitor_form", "youtube", "social"]);

// --- USER & AUTH TABLES ---
export const users = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("emailVerified").notNull(),
	image: text("image"),
	role: roleEnum("role").default("editor").notNull(),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull(),
});

export const sessions = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expiresAt").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull(),
	ipAddress: text("ipAddress"),
	userAgent: text("userAgent"),
	userId: text("userId").notNull().references(() => users.id),
});

export const accounts = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("accountId").notNull(),
	providerId: text("providerId").notNull(),
	userId: text("userId").notNull().references(() => users.id),
	accessToken: text("accessToken"),
	refreshToken: text("refreshToken"),
	idToken: text("idToken"),
	accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
	refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull(),
});

export const verifications = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expiresAt").notNull(),
	createdAt: timestamp("createdAt"),
	updatedAt: timestamp("updatedAt"),
});

// --- CMS CORE STRUCTURE ---

export const organizations = pgTable("organization", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	slug: text("slug").notNull().unique(), // e.g., "university-x", "dev-bootcamp"
	ownerId: text("userId").notNull().references(() => users.id),
	createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const categories = pgTable("category", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("name").notNull(), // e.g., "Product Review", "Course Success", "Event Feedback"
	organizationId: text("organizationId").notNull().references(() => organizations.id),
});

export const testimonials = pgTable("testimonial", {
	id: text("id").primaryKey(),
	organizationId: text("organizationId").notNull().references(() => organizations.id),
	categoryId: uuid("categoryId").references(() => categories.id),
	
	// Visitor / Storyteller Data
	visitorName: text("visitorName").notNull(),
	visitorRole: text("visitorRole").notNull(),    // e.g., "Frontend Developer Student"
	visitorCompany: text("visitorCompany"),       // e.g., "Google"
	visitorImage: text("visitorImage"),           // Avatar URL
	
	// Content & Multimedia
	content: text("content").notNull(),
	mediaUrl: text("mediaUrl"),                   // Original link (YT, Cloudinary, etc.)
	mediaType: text("mediaType"),                 // 'video' | 'image' | 'text'
	rating: integer("rating").default(5),
	
	// Collection & Moderation
	source: sourceEnum("source").default("manual").notNull(), 
	status: statusEnum("status").default("pending").notNull(),
	isFeatured: boolean("isFeatured").default(false), // SELECTED for wall/carousel
	
	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// --- INVITATIONS & ACCESS CONTROL ---

export const invitations = pgTable("invitation", {
	id: text("id").primaryKey(),
	email: text("email").notNull(),
	role: roleEnum("role").default("editor").notNull(),
	token: text("token").notNull().unique(), 
	organizationId: text("organizationId").references(() => organizations.id),
	invitedById: text("invitedById").notNull().references(() => users.id),
	expiresAt: timestamp("expiresAt").notNull(),
	createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const visitorAccessTokens = pgTable("visitor_access_token", {
	id: uuid("id").defaultRandom().primaryKey(),
	organizationId: text("organizationId").notNull().references(() => organizations.id),
	token: text("token").notNull().unique(),
	expiresAt: timestamp("expiresAt").notNull(),
	createdAt: timestamp("createdAt").notNull().defaultNow(),
});
