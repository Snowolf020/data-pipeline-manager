import { PipelineService } from './services/PipelineService';
import { dataUtils } from './utils/dataUtils';
import { errorUtils } from './utils/errorUtils';

async function main() {
  try {
    const pipelineService = new PipelineService();
    await pipelineService.initPipeline();
    console.log('Pipeline initialized successfully.');
  } catch (error) {
    errorUtils.handleError(error);
  }
}

main();
