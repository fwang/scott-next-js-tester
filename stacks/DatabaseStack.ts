import { DATABASE } from '.';
import { StackContext, RDS } from '@serverless-stack/resources';

export function DatabaseStack({ stack }: StackContext) {
	const database = new RDS(stack, 'Cluster', {
		engine: 'postgresql10.14',
		defaultDatabaseName: DATABASE,
		migrations: 'src/migrations',
		scaling: {
			autoPause: true,
			minCapacity: 'ACU_2',
			maxCapacity: 'ACU_4',
		},
	});
	return { database };
}
