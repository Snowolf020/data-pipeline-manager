import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { errorUtils } from './errorUtils';

const prisma = new PrismaClient();

export const dataUtils = {
  async validateData(schema: any, data: any) {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw errorUtils.createError(400, error.issues);
      }
      throw error;
    }
  },

  async transformData(data: any, transformFunction: (data: any) => any) {
    try {
      return transformFunction(data);
    } catch (error) {
      throw errorUtils.createError(500, 'Failed to transform data');
    }
  },

  async processData(data: any, processFunction: (data: any) => any) {
    try {
      return processFunction(data);
    } catch (error) {
      throw errorUtils.createError(500, 'Failed to process data');
    }
  },

  async getDataFromDatabase(model: any, query: any) {
    try {
      return await prisma[model].findMany(query);
    } catch (error) {
      throw errorUtils.createError(500, 'Failed to retrieve data from database');
    }
  },
};