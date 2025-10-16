import dotenv from 'dotenv';
import path from 'path';

// Load .env file from the project root
dotenv.config({ path: path.resolve(__dirname, '.env') });

export interface EnvConfig {
  teamsWebhookUrl: string;
  teamsUserName: string;
  teamsUserEmail: string;
  reportPortal: {
    baseUrl: string;
    apiKey: string;
    project: string;
    launchName: string;
    launchAttributes: Array<{ key?: string; value: string }>;
  };
}

// Parse attributes from environment variable
const parseAttributes = (attributesStr: string | undefined): Array<{ key?: string; value: string }> => {
  if (!attributesStr) {
    return [
      { key: 'Platform', value: 'Playwright' },
      { value: 'POC' },
      { key: 'Browser', value: 'Chrome' }
    ];
  }

  try {
    // Try to parse as JSON first (for backward compatibility)
    return JSON.parse(attributesStr);
  } catch {
    // If JSON parsing fails, parse the semicolon-separated format
    // Format: "Platform:Playwright;POC;Browser:Chrome"
    return attributesStr.split(';').map(attr => {
      const trimmed = attr.trim();
      if (trimmed.includes(':')) {
        const [key, value] = trimmed.split(':');
        return { key: key.trim(), value: value.trim() };
      }
      return { value: trimmed };
    });
  }
};

export const env_config: EnvConfig = {
  teamsWebhookUrl: process.env.TEAMS_WEBHOOK_URL || '',
  teamsUserName: process.env.TEAMS_USER_NAME || 'TestUser',
  teamsUserEmail: process.env.TEAMS_USER_EMAIL || '',
  reportPortal: {
    baseUrl: process.env.REPORT_PORTAL_BASE_URL || '',
    apiKey: process.env.REPORT_PORTAL_API_KEY || '',
    project: process.env.REPORT_PORTAL_PROJECT || '',
    launchName: process.env.REPORT_PORTAL_LAUNCH_NAME || '',
    launchAttributes: parseAttributes(process.env.REPORT_PORTAL_LAUNCH_ATTRIBUTES)
  }
};

export default env_config;

