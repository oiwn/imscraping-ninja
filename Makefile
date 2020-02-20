.PHONY: start deploy

start:
	npm start

deploy:
	npm build && hugo && netlify deploy
