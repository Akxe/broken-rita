import { objectType } from '@nexus/schema';

export const Period = objectType({
	name: 'Period',
	definition(t) {
		t.model.periodID();
		t.model.from();
		t.model.till();
	},
});

export const PeriodTypes = [
	Period,
	/*extendType({
		type: 'Query',
		definition(t) {
			t.crud.obdobi({
				type: 'Period',
				alias: 'period',
			});
			t.crud.obdobis({
				type: 'Period',
				alias: 'periods'
			});
		},
	}),*/
];
