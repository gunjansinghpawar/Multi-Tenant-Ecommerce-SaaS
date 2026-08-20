import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';

/**
 * A Zod schema primitive that automatically sanitizes incoming HTML strings
 * to protect against XSS (Cross-Site Scripting) attacks.
 */
export const zodSanitizedHtml = z.string().transform((val) => {
  return sanitizeHtml(val, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']), 
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      'a': ['href', 'name', 'target'],
      'img': ['src', 'alt', 'width', 'height']
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowProtocolRelative: false,
    enforceHtmlBoundary: true,
  });
});

/**
 * SSRF Protection Validator.
 * Validates URLs and explicitly rejects localhost, private networks, and cloud metadata IPs.
 */
export const zodSecureUrl = z.string().url().refine((url) => {
  try {
    const parsed = new URL(url);
    if (['localhost', '127.0.0.1', '::1', '0.0.0.0'].includes(parsed.hostname)) return false;
    if (parsed.hostname === '169.254.169.254') return false;
    if (parsed.hostname.match(/^(10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/)) return false;
    if (!['http:', 'https:'].includes(parsed.protocol)) return false;
    return true;
  } catch (e) {
    return false;
  }
}, { message: "URL is invalid or targets a restricted internal network address (SSRF Protection)." });
