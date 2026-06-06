import { PrismaClient } from '@prisma/client';
   import { Pipeline } from '../models/PipelineModel';
   import { errorHandler } from '../utils/errorUtils';
   import { dataHandler } from '../utils/dataUtils';

   const prisma = new PrismaClient();

   class PipelineService {
       async getAllPipelines(): Promise<Pipeline[]> {
           try {
               const pipelines = await prisma.pipeline.findMany();
               return pipelines;
           } catch (error) {
               throw errorHandler(error);
           }
       }

       async getPipelineById(id: number): Promise<Pipeline | null> {
           try {
               const pipeline = await prisma.pipeline.findUnique({ where: { id } });
               return pipeline;
           } catch (error) {
               throw errorHandler(error);
           }
       }

       async createPipeline(pipeline: Pipeline): Promise<Pipeline> {
           try {
               const newPipeline = await prisma.pipeline.create({ data: pipeline });
               return newPipeline;
           } catch (error) {
               throw errorHandler(error);
           }
       }

       async updatePipeline(id: number, pipeline: Pipeline): Promise<Pipeline> {
           try {
               const updatedPipeline = await prisma.pipeline.update({ where: { id }, data: pipeline });
               return updatedPipeline;
           } catch (error) {
               throw errorHandler(error);
           }
       }

       async deletePipeline(id: number): Promise<void> {
           try {
               await prisma.pipeline.delete({ where: { id } });
           } catch (error) {
               throw errorHandler(error);
           }
       }
   }

   export const pipelineService = new PipelineService();