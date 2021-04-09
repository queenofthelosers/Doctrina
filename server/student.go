package main

import(
	"fmt"
	"net/http"
	"os"
)



func readme(res http.ResponseWriter, req *http.Request) {
	fmt.Println("Trying")
	res.Header().Set("Access-Control-Allow-Origin", "*")	
	res.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	res.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	homeDir,_ := os.Getwd()
	fmt.Println(homeDir)
	http.ServeFile(res, req, homeDir +"\\videos\\merged\\merged.mp4")
}

// func tryme(w http.ResponseWriter, r *http.Request) {
// 	fmt.Println("Trying")
// 	w.Header().Set("Access-Control-Allow-Origin", "*")	
// 	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
// 	w.Header().Set("Content-Type","application/x-mpegURL")
// 	homeDir,_ := os.Getwd()
// 	fmt.Println(homeDir)
// 	w.ServeHTTP()
// 	http.ServeFile(w, r, homeDir +"\\videos\\merged\\merged.mp4")
// }

func addHeaders(h http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		// w.Header().Set("Content-Type","application/x-mpegURL")
		w.Header().Set("Content-Type","text/html")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		h.ServeHTTP(w, r)
		fmt.Println(r.URL)
		fmt.Println("Bye bye")
	}
}