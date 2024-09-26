import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config(); 

const schema = Joi.object({
    MONGO_URI: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    NODE_ENV: Joi.string().valid('development', 'production', 'test').required().default('development'),
    PORT: Joi.number().default(2707),
    LOGS_ENABLED: Joi.boolean().default(false),
    JWT_EXPIRATION: Joi.string().default('1d'),
}).unknown(); // Allow unknown keys

const { error, value } = schema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    mongoUri: value.MONGO_URI,
    jwtSecret: value.JWT_SECRET,
    nodeEnv: value.NODE_ENV,
    port: value.PORT,
    logsEnabled: value.LOGS_ENABLED,
    jwtExpiration: value.JWT_EXPIRATION,
};

export {config};