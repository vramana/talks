import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/white.css";
import Reveal from "reveal.js";
import RevealMarkdown from "reveal.js/plugin/markdown/markdown.esm.js";
import Highlight from "reveal.js/plugin/highlight/highlight.esm.js";

const deck = new Reveal({
	plugins: [RevealMarkdown, Highlight],
});
deck.initialize({ hash: true, slideNumber: true });
