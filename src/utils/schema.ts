import { FastifyInstance } from "fastify";


export function addCustomSchema(fastify: FastifyInstance, schemas: any[]) {

   for (const schema of schemas) {
     fastify.addSchema(schema);
   }
 }

 export const $ref = (schemaId : string) => {$ref: schemaId}