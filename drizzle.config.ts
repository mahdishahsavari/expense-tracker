import { Config, defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/utils/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config);
