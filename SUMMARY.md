Summary: 6-Language i18n Implementation for GLV 402 Manual Site

What was done
- Implemented a 6-language internationalization setup across the site using shared assets: assets/i18n.js and assets/i18n.css.
- Ensured a single HTML per page (no per-language copies) with language switcher buttons present on every page.
- Language persistence via localStorage (key: glv402-lang) and first-visit defaulting to browser language among [en, ja, zh, ko, fr, es], otherwise English.
- Document titles automatically localized per page via i18n.js, keyed by the page path.
- Kept all URLs unchanged.

Pages converted
- /index.html
- /access/index.html
- /circuit-breaker/index.html
- /emergency/index.html
- /equipment/index.html
- /gas-reset/index.html
- /house-rules/index.html
- /how-to-open/index.html
- /laundry/index.html
- /nearby-shops/index.html
- /parking/index.html
- /taxi/index.html
- /trash/index.html

Notable edits
- equipment/index.html: Updated the visible page header title to use multilingual spans with data-i18n, matching other pages.
- laundry/index.html: Updated the visible page header title to use multilingual spans with data-i18n, matching other pages.

Flags (codes removed or omitted)
- Reviewed content for key numbers, lock codes, keybox codes, or similar access codes. None were found in the source content, so nothing was removed or redacted.

Site-specific note (per BRIEF)
- The uncommitted change to index.html that removes the embedded chat section was preserved as-is. The page retains a small host-contact note instead of an embedded chat widget.

How it works
- assets/i18n.css: Controls display of elements with .lang and language-specific classes (e.g., .lang-en, .lang-ja, …) based on the root html[data-lang].
- assets/i18n.js: Detects the language (localStorage → browser → en), applies it to the document, toggles language button state, and sets document.title via the TITLES map keyed by each page slug.

Validation checklist
- Language switchers render on all pages and toggle active state.
- Selected language persists across reloads and navigation.
- First visit defaults to the browser language if supported, else English.
- No page URLs changed.
