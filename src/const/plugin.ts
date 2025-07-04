export const PLUGIN_SCHEMA_SEPARATOR = '____';
export const PLUGIN_SCHEMA_API_MD5_PREFIX = 'MD5HASH_';

export const ARTIFACT_TAG = 'artifact';
export const ARTIFACT_THINKING_TAG = 'thinking';

// https://regex101.com/r/TwzTkf/2
export const ARTIFACT_TAG_REGEX = /<artifact\b[^>]*>(?<content>[\S\s]*?)(?:<\/artifact>|$)/;

// https://regex101.com/r/r9gqGg/1
export const ARTIFACT_TAG_CLOSED_REGEX = /<artifact\b[^>]*>([\S\s]*?)<\/artifact>/;

// https://regex101.com/r/AvPA2g/1
export const ARTIFACT_THINKING_TAG_REGEX = /<thinking\b[^>]*>([\S\s]*?)(?:<\/thinking>|$)/;

export const THINKING_TAG_REGEX = /<think\b[^>]*>([\S\s]*?)(?:<\/think>|$)/;
