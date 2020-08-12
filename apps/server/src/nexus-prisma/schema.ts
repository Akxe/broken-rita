import { makeSchema, queryType } from '@nexus/schema';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import { join } from 'path';

import type { Context } from './context';
import { CarrierTypes } from './schema/carrier';
import { CartTypes } from './schema/cart';
import { PeriodTypes } from './schema/period';

export const schema = makeSchema({
	types: [
		queryType({
			definition(t) {
				t.string('running', {
					resolve() { return 'OK'; },
				});
			}
		}),
		CartTypes,
		PeriodTypes,
		CarrierTypes,
	],
	plugins: [nexusSchemaPrisma({
		prismaClient: (ctx: Context) => ctx.prisma,
		experimentalCRUD: true,
	})],
	outputs: {
		schema: join(__dirname, '/../schema.graphql'),
		typegen: join(__dirname, '/nexus.generated.ts'),
	},
	typegenAutoConfig: {
		contextType: 'Context.Context',
		sources: [
			{
				source: '@prisma/client',
				alias: 'prisma',
			},
			{
				source: require.resolve('./context'),
				alias: 'Context',
			},
		],
	},
});
