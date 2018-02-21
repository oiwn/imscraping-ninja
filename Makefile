.PHONY: start deploy

start:
	npm start

deploy:
	npm build && hugo && netlify deploy

# npm run build && surge ./build --domain guttural-balloon.surge.sh
