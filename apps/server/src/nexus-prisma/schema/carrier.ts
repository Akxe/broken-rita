import { extendType, objectType } from '@nexus/schema';

export const CarrierPhoto = objectType({
	name: 'CarrierPhoto',
	definition(t) {
		t.model.carrierID();
		t.model.src({
			async resolve(root, args, ctx, info, originalResolve) {
				let src: string = await originalResolve(root, args, ctx, info);
				src = src.replace(/\\/g, '/');
				if (!src.startsWith('/')) {
					src = '/' + src;
				}
				return src;
			}
		});
		t.model.order();
	},
});

export const Carrier = objectType({
	name: 'Carrier',
	definition(t) {
		t.model.carrierID();
		t.model.lat();
		t.model.lng();
		t.model.city();
		t.model.street();
		t.model.description();
		t.model.type();
		t.model.orientation();
		t.model.photos({
			pagination: false,
			ordering: false,
			filtering: false,
		});
	},
});

export const CarrierTypes = [
	Carrier,
	CarrierPhoto,
	extendType({
		type: 'Query',
		definition(t) {
			t.crud.carrier();
			t.crud.carriers({
				filtering: {
					lat: true,
					lng: true,
					type: true,
					origin: true,
				},
			});
		},
	})
];
