import { User } from './User';

export interface Unit {
    id: number;
    name: string;
    endereco: string;
    isFranchised: boolean;
    users: User[];
}