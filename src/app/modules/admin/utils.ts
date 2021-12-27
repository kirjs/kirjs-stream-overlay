import TurndownService from 'turndown';

const turndownService = new TurndownService();

export function normalizeSpaces(content: string): string {
  return turndownService.turndown(content);
}

export function stripHtml(html: string): string {
  html = normalizeSpaces(html);
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || '';
}
