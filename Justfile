# Zola compiles sass/main.scss -> main.css natively (compile_sass = true),
# so no npm/css watcher is needed — `zola serve` watches sass/ and live-reloads.

serve:
	zola serve

# alias kept for back-compat (AGENTS.md references `just server`)
server: serve

check:
	zola check

build:
	zola build

deploy:
	zola build && netlify deploy --dir public --prod
