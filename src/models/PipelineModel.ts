import { Model } from '@prisma/client';

export class PipelineModel {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  stages: StageModel[];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.stages = data.stages;
  }
}

class StageModel {
  id: string;
  name: string;
  description: string;
  pipelineId: string;
  tasks: TaskModel[];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.pipelineId = data.pipelineId;
    this.tasks = data.tasks;
  }
}

class TaskModel {
  id: string;
  name: string;
  description: string;
  stageId: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.stageId = data.stageId;
  }
}