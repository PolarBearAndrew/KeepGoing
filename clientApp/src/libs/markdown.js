
import markdown from 'marked';
import highlightJS from 'highlight.js';

markdown.setOptions({
	renderer: new markdown.Renderer(),
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: true,
	smartLists: true,
	smartypants: false,

	// Synchronous highlighting with highlight.js
	highlight: function (code) {
		return highlightJS.highlightAuto(code).value;
	}
});

// 自行多擴充的 replace
export default function semanticMarkdown(md) {
	return markdown(md)
		.replace(/<a /g, '<a target="_blank" ')
		.replace(/<ul>/, '<ul class="ui list">')
		.replace(/<code class="/, '<code style="width:100%;border:null;display:block;" class="ui secondary segment ')
		.replace(/<table>/g, '<table class="ui table striped">')
		.replace(/<img /g, '<img class="ui medium rounded image centered" ');
}
