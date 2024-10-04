
import z from "zod"
import zodToJsonSchema from "zod-to-json-schema";

const managerCore = {
  first_name: z.string(),
  last_name: z.string(),
  user_name: z.string(),
  tel: z.string(),
};

export const createManagerSchema = z.object({
  ...managerCore,
  password: z.string(),
});

const loginSchema = z.object({
  user_name: z.string(),
  password: z.string(),
});

const IcreateManagerResponseSchema = z.object({
  ...managerCore,
  id: z.number(),
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
});

export type CreateManagerInputType = z.infer<typeof createManagerSchema>;
export type LoginSchemaInputType = z.infer<typeof loginSchema>;


// export const { schemas: managerSchema, $ref } = buildJsonSchemas({
//   createManagerSchema,
//   createManagerResponseSchema,
//   loginResponseSchema,
// });

const createManagerJsonSchema = {$id: "createManagerSchema",...zodToJsonSchema(createManagerSchema)}
const loginResponseJsonSchema = {$id: "loginResponseSchema",...zodToJsonSchema(loginResponseSchema)}
const createManagerResponseSchema = {$id:"createManagerResponseSchema",...zodToJsonSchema(IcreateManagerResponseSchema)}

export const managerSchema = [
  createManagerJsonSchema,
  loginResponseJsonSchema,
  createManagerResponseSchema
]