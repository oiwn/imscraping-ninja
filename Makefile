.PHONY: server start deploy

server:
	hugo server -D

start:
	npm start

deploy:
	npm build && hugo && netlify deploy
