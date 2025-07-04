import { ARTIFACT_TAG_REGEX, ARTIFACT_THINKING_TAG_REGEX } from '@/const/plugin';

/**
 * Replace all line breaks in the matched `artifact` tag with an empty string
 */
export const processWithArtifact = (input: string = '') => {
  // First remove outer fenced code block if it exists
  let output = input.replace(
    /^([\S\s]*?)\s*```[^\n]*\n((?:<thinking>[\S\s]*?<\/thinking>\s*\n\s*)?<artifact[\S\s]*?<\/artifact>\s*)\n```\s*([\S\s]*?)$/,
    (_, before = '', content, after = '') => {
      return [before.trim(), content.trim(), after.trim()].filter(Boolean).join('\n\n');
    },
  );

  const thinkMatch = ARTIFACT_THINKING_TAG_REGEX.exec(output);

  // If the input contains the `thinking` tag, replace all line breaks with an empty string
  if (thinkMatch) {
    output = output.replace(ARTIFACT_THINKING_TAG_REGEX, (match) =>
      match.replaceAll(/\r?\n|\r/g, ''),
    );
  }

  // Add empty line between thinking and artifact if they are adjacent
  output = output.replace(/(<\/thinking>)\r?\n(<artifact)/, '$1\n\n$2');

  // Remove fenced code block between artifact and HTML content
  output = output.replace(
    /(<artifact[^>]*>)\s*```[^\n]*\n([\S\s]*?)(```\n)?(<\/artifact>)/,
    (_, start, content, __, end) => {
      if (content.trim().startsWith('<!DOCTYPE html') || content.trim().startsWith('<html')) {
        return start + content.trim() + end;
      }
      return start + content + (__ || '') + end;
    },
  );

  // Keep existing code blocks that are not part of artifact
  output = output.replace(
    /^([\S\s]*?)(<thinking>[\S\s]*?<\/thinking>\s*\n\s*<artifact[\S\s]*?<\/artifact>)([\S\s]*?)$/,
    (_, before, content, after) => {
      return [before.trim(), content.trim(), after.trim()].filter(Boolean).join('\n\n');
    },
  );

  const match = ARTIFACT_TAG_REGEX.exec(output);
  // If the input contains the `artifact` tag, replace all line breaks with an empty string
  if (match) {
    output = output.replace(ARTIFACT_TAG_REGEX, (match) => match.replaceAll(/\r?\n|\r/g, ''));
  }

  // if not match, check if it's start with <artifact but not closed
  const regex = /<artifact\b(?:(?!\/?>)[\S\s])*$/;
  if (regex.test(output)) {
    output = output.replace(regex, '<artifact>');
  }

  return output;
};

// 预处理函数：确保 think 标签前后有两个换行符
export const normalizeThinkTags = (input: string) => {
  return (
    input
      // 确保 <think> 标签前后有两个换行符
      .replaceAll(/([^\n])\s*<think>/g, '$1\n\n<think>')
      .replaceAll(/<think>\s*([^\n])/g, '<think>\n\n$1')
      // 确保 </think> 标签前后有两个换行符
      .replaceAll(/([^\n])\s*<\/think>/g, '$1\n\n</think>')
      .replaceAll(/<\/think>\s*([^\n])/g, '</think>\n\n$1')
      // 处理可能产生的多余换行符
      .replaceAll(/\n{3,}/g, '\n\n')
  );
};
