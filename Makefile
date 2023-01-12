.PHONY: server deploy

server:
	zola serve

deploy:
	zola build && netlify deploy --dir public --prod
