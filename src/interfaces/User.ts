import { Unit } from "./Unit";

export interface User {
    id: number;
    name: string;
    email: string;
    unit: Unit
}