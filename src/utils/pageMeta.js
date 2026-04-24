const SITE_NAME = 'St. Lawrence Academy';
const SITE_URL  = 'https://stlawrenceacademy.pythonanywhere.com';
const DEFAULT_IMAGE = `${SITE_URL}/images/secondary/assembly_overview.JPG`;

const setMeta = (property, content, isName = false) => {
  const attr = isName ? 'name' : 'property';
  let el = document.querySelector(`meta[${attr}="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

export const setPageMeta = (title, description, image) => {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | Juba, South Sudan`;
  const desc = description || `${SITE_NAME} — quality education in Juba, South Sudan.`;
  const img  = image || DEFAULT_IMAGE;
  const url  = window.location.href;

  // Basic
  document.title = fullTitle;
  setMeta('description', desc, true);

  // Open Graph
  setMeta('og:type',        'website');
  setMeta('og:site_name',   SITE_NAME);
  setMeta('og:title',       fullTitle);
  setMeta('og:description', desc);
  setMeta('og:image',       img);
  setMeta('og:url',         url);

  // Twitter / X card
  setMeta('twitter:card',        'summary_large_image', true);
  setMeta('twitter:title',       fullTitle, true);
  setMeta('twitter:description', desc, true);
  setMeta('twitter:image',       img, true);
};
