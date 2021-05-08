export function normalizeSpaces(content: string): string {
  return content.replace(/<p[^>]*>/g, '')
    .replace(/<\/p>/g, '\r\n\r\n')
    .replace(/<br\s?\/?>/g, '\r\n')
    .replace(/&nbsp;/g, ' ');
}

export function stripHtml(html: string): string {
  html = normalizeSpaces(html);
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || '';
}
