.PHONY: server start deploy

server:
	zola serve

start:
	npm start

deploy:
	npm build && hugo && netlify deploy
