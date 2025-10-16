import { env_config } from './env.config';

const launchDescription: string = 'Playwright Test Launch';
const includeTestSteps: boolean = true;
const uploadVideo: boolean = true;
const uploadTrace: boolean = true;

const RP_Agent_Config = {
  endpoint: env_config.reportPortal.baseUrl,
  apiKey: env_config.reportPortal.apiKey,
  project: env_config.reportPortal.project,
  launch: env_config.reportPortal.launchName,
  description: launchDescription,
  attributes: env_config.reportPortal.launchAttributes,
  includeTestSteps: includeTestSteps,
  includePlaywrightProjectNameToCodeReference: true,
  extendTestDescriptionWithLastError: false,
  takeScreenshot: "onFailure",
  uploadVideo: uploadVideo,
  uploadTrace: uploadTrace
};
  
export default RP_Agent_Config;