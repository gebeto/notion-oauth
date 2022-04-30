package main

import (
	"io/ioutil"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		req, err := http.NewRequest(r.Method, "https://api.notion.com"+r.URL.Path, r.Body)
		if err != nil {
			log.Fatalln(err)
		}
		req.Header = r.Header

		client := &http.Client{}
		resp, err := client.Do(req)

		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Fatalln(err)
		}

		w.Write(body)
	})

	log.Fatal(http.ListenAndServe(":8081", nil))
}
