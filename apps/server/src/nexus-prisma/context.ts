import { PrismaClient } from '@prisma/client';
import { PubSub } from 'apollo-server';
import { Request, Response } from 'express';

interface ExpressContext {
	res: Response;
	req: Request;
}

export interface Context extends ExpressContext {
	prisma: PrismaClient;
	pubsub: PubSub;
}

const pubsub = new PubSub();
export const prisma = new PrismaClient({
	log: ['query'],
});

export function createContext<T extends ExpressContext>(ctx: T): Context & T {
	return {
		prisma,
		pubsub,
		...ctx,
	};
}
