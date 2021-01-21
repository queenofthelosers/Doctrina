package main

import (
	"fmt"
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
	"log"
	"context"
	"time"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"

	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
	"github.com/gorilla/sessions"
)
type appUser struct{
	Email string 
	Name string
}
var current_user appUser

func handlerFunc(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	fmt.Fprint(w, "Hello!")
	
}

func func1(w http.ResponseWriter, r *http.Request) {
	user, err := gothic.CompleteUserAuth(w, r)
    if err != nil {
      fmt.Fprintln(w, err)
      return
	}
	//w.Header().Set("Content-Type","application/json")

	//fmt.Println(user[email])
	//fmt.Println(err)
	//json.NewEncoder(w).Encode(user)	
	email_id := user.RawData["email"]
	username := user.RawData["name"]
	current_user.Email = email_id.(string)
	current_user.Name = username.(string)
	fmt.Println(current_user)
	//send user struct to React
	http.Redirect(w, r,"http://localhost:3000/instructor", http.StatusSeeOther)
}

func func2(w http.ResponseWriter, r *http.Request) {
	gothic.BeginAuthHandler(w, r)
}

func getCurrUser(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type","application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(current_user)
}

func main() {
	
	fmt.Println("Starting server...")
	key := "foo"  // Replace with your SESSION_SECRET or similar
	maxAge := 86400 * 30  // 30 days
	isProd := false       // Set to true when serving over https
  
	store := sessions.NewCookieStore([]byte(key))
	store.MaxAge(maxAge)
	store.Options.Path = "/"
	store.Options.HttpOnly = true   // HttpOnly should always be enabled
	store.Options.Secure = isProd

	gothic.Store = store

	goth.UseProviders(
	  google.New("652161685649-gs1p9ah7uslghssa354rla0md9k8jmhn.apps.googleusercontent.com", "y8csMmj4P8_clC8colEiDwr_", "http://localhost:8080/auth/google/callback", "email", "profile"),
	)

	r := mux.NewRouter()
	r.HandleFunc("/", handlerFunc)
	r.HandleFunc("/auth/{provider}/callback",func1)
	r.HandleFunc("/auth/{provider}",func2)
	r.HandleFunc("/api/currentuser",getCurrUser)
	
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
	//End of Mongo connection


	http.ListenAndServe(":8080", r)


}
