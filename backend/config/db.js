import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const {PGUSER,PGPASSWORD,PGHOST,PGDATABASE} = process.env;

export const sql = neon(
   `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require` 
)//postgresql://neondb_owner:npg_eA2JWF5uyzIZ@ep-cool-hat-a8yov124-pooler.eastus2.azure.neon.tech/neondb?sslmode=require
//ajkey_01jkr0ejyre9zrrcb82ydpvx6s
console.log('db.js seccess');