import { Entity } from "./baseModel";

export type City = Entity<{
	id: number;
	name: string;
}>;
