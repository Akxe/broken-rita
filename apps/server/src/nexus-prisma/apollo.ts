import { ApolloServer } from 'apollo-server';

import { environment } from 'src/environments/environment';
import { createContext } from './context';
import { schema } from './schema';

export default new ApolloServer({
	schema,
	context: createContext,
	playground: !environment.production,
}).getMiddleware();
