# shortcuts
sss:
	cd build/ && python -m SimpleHTTPServer 3000

deploy:
	npm run build && surge ./build --domain guttural-balloon.surge.sh
