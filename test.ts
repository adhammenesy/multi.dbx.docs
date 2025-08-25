import { JsonData } from "multi.dbx";

interface User { name: string; age: number; }
const db = new JsonData();

db.connect("db");



console.log(db.fetch<User>("user"));