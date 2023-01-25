import fs from 'fs';
import YAML from 'yaml';

/* Interfaces */
interface env {
    server: {
        port: number
        name: string
    },
    database: {
        username: string,
        password: string,
        cluster: string
    }
}

const envFile = fs.readFileSync('env.yml', 'utf8');
const env: env = YAML.parse(envFile);
export default env;
