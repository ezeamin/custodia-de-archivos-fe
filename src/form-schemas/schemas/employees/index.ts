import { CreateSchema } from './createSchema';
import type { SearchSchema } from './searchSchema';

// Join other Employees schemas with "|"
export type EmployeesSchemas = SearchSchema | CreateSchema;
