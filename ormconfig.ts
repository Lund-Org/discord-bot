import { DataSource, DataSourceOptions } from 'typeorm';
import ormconfig from './ormconfig.json';

const DataSourceConfig = new DataSource(ormconfig as DataSourceOptions);
export default DataSourceConfig;
