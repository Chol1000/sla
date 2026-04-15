const HIGHLIGHT_CLASS = 'sla-search-highlight';
const ACTIVE_CLASS    = 'sla-search-highlight--active';

// Remove all previous highlights from DOM
export const clearHighlights = () => {
  document.querySelectorAll(`.${HIGHLIGHT_CLASS}`).forEach(el => {
    const parent = el.parentNode;
    if (!parent) return;
    parent.replaceChild(document.createTextNode(el.textContent), el);
    parent.normalize();
  });
};

// Walk all text nodes inside <main>, find the term, wrap in <mark>, scroll to first match
export const highlightSearchTerm = (term) => {
  clearHighlights();
  if (!term || term.trim().length < 2) return;

  const root = document.querySelector('main') || document.body;
  const termLower = term.trim().toLowerCase();

  // Collect text nodes that contain the term
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const tag = node.parentNode?.tagName || '';
      if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'INPUT', 'TEXTAREA'].includes(tag)) {
        return NodeFilter.FILTER_REJECT;
      }
      if (node.parentNode?.classList?.contains(HIGHLIGHT_CLASS)) {
        return NodeFilter.FILTER_REJECT;
      }
      return node.textContent.toLowerCase().includes(termLower)
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP;
    },
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  if (!nodes.length) return;

  let firstMark = null;

  nodes.forEach(node => {
    const text  = node.textContent;
    const lower = text.toLowerCase();
    let cursor  = 0;
    const frag  = document.createDocumentFragment();
    let found   = false;

    while (cursor < text.length) {
      const idx = lower.indexOf(termLower, cursor);
      if (idx === -1) {
        frag.appendChild(document.createTextNode(text.slice(cursor)));
        break;
      }
      if (idx > cursor) frag.appendChild(document.createTextNode(text.slice(cursor, idx)));

      const mark = document.createElement('mark');
      mark.className = HIGHLIGHT_CLASS;
      mark.textContent = text.slice(idx, idx + term.trim().length);
      frag.appendChild(mark);

      if (!firstMark && !found) { firstMark = mark; found = true; }
      cursor = idx + term.trim().length;
    }

    node.parentNode.replaceChild(frag, node);
  });

  if (firstMark) {
    firstMark.classList.add(ACTIVE_CLASS);
    // Offset for fixed header (~110px topbar+header)
    const top = firstMark.getBoundingClientRect().top + window.scrollY - 130;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });

    // Fade out highlights after 5 seconds
    setTimeout(clearHighlights, 5000);
  }
};
