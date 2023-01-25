import fs from 'fs';
import YAML from 'yaml';
const envFile = fs.readFileSync('env.yml', 'utf8');
const env = YAML.parse(envFile);
export default env;
