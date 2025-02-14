import { describe, expect, it } from 'vitest';

import rehypePlugin from './rehypePlugin';

describe('rehypePlugin', () => {
  it('should transform <thinking> tags within paragraphs', () => {
    const tree = {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'p',
          children: [
            { type: 'text', value: 'Before ' },
            { type: 'raw', value: '<thinking>' },
            { type: 'text', value: 'Thinking content' },
            { type: 'raw', value: '</thinking>' },
            { type: 'text', value: ' After' },
          ],
        },
      ],
    };

    const expectedTree = {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'thinking',
          properties: {},
          children: [{ type: 'text', value: 'Thinking content' }],
        },
      ],
    };

    const plugin = rehypePlugin();
    plugin(tree);

    expect(tree).toEqual(expectedTree);
  });

  it('should not transform when only closing tag is present', () => {
    const tree = {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'p',
          children: [
            { type: 'text', value: 'Thinking content' },
            { type: 'raw', value: '</thinking>' },
            { type: 'text', value: ' After' },
          ],
        },
      ],
    };

    const originalTree = JSON.parse(JSON.stringify(tree));

    const plugin = rehypePlugin();
    plugin(tree);

    expect(tree).toEqual(originalTree);
  });

  it('should handle multiple paragraphs and transformations', () => {
    const tree = {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'p',
          children: [{ type: 'text', value: 'Normal paragraph' }],
        },
        {
          type: 'element',
          tagName: 'p',
          children: [
            { type: 'raw', value: '<thinking>' },
            { type: 'text', value: 'First thinking' },
            { type: 'raw', value: '</thinking>' },
          ],
        },
        {
          type: 'element',
          tagName: 'p',
          children: [
            { type: 'raw', value: '<thinking>' },
            { type: 'text', value: 'Second thinking' },
            { type: 'raw', value: '</thinking>' },
          ],
        },
      ],
    };

    const expectedTree = {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'p',
          children: [{ type: 'text', value: 'Normal paragraph' }],
        },
        {
          type: 'element',
          tagName: 'thinking',
          properties: {},
          children: [{ type: 'text', value: 'First thinking' }],
        },
        {
          type: 'element',
          tagName: 'thinking',
          properties: {},
          children: [{ type: 'text', value: 'Second thinking' }],
        },
      ],
    };

    const plugin = rehypePlugin();
    plugin(tree);

    expect(tree).toEqual(expectedTree);
  });
});
