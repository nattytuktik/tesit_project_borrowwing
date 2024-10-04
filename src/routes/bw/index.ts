import { FastifyPluginAsync} from "fastify";
import { createBwHandler } from "./bw.controller";

const bowwing: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
   fastify.get('/', () => {
      return {
         status: true
      }
   })
   fastify.post('/', createBwHandler)
}

export default bowwing