.PHONY: start deploy

start:
	hugo server -w

deploy:
	hugo && netlify deploy

# npm run build && surge ./build --domain guttural-balloon.surge.sh
