package main

import (
	"fmt"
	"net/http"
	"github.com/gorilla/mux"
	"log"
	"context"
	"time"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func handlerFunc(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	fmt.Fprint(w, "Hello!")
	
}

func main() {
	fmt.Println("Starting server...")
	r := mux.NewRouter()
	r.HandleFunc("/", handlerFunc)
	
	//Mongo Connection Code
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://admin:admin@cluster0.5ozca.mongodb.net/seproj?retryWrites=true&w=majority"))
	if err != nil {
		log.Fatal(err)
	}
	ctx,_ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)

	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}

	databases, err := client.ListDatabaseNames(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(databases)

	http.ListenAndServe(":8080", r)


}
