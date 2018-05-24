self.addEventListener("fetch", function(ev){
	console.log(ev.request)

	const promiseResponse = new Promise((res,rej) => {
		fetch(ev.request).then(response => {
			if(response.status == 404 && ev.request.destination == "image")
				return fetch("/broken.png").then(res).catch(rej)
			res(response)
		}).catch(rej);
	})

	ev.respondWith(promiseResponse);
})