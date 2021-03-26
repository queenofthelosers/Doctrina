package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"

	_ "github.com/go-git/go-git/v5"
	"github.com/gorilla/sessions"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
)

type appUser struct {
	ID    primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Email string             `json:"email" bson:"email"`
	Name  string             `json:"name" bson:"name"`
}

type Details struct {
	ClientID     string `json:"ClientID"`
	ClientSecret string `json:"ClientSecret"`
	GitAccessToken string `json:"GitAccessToken"`
}

func ReadConfig(inPath string) (*Details, error) {
	configReader, err := os.Open(inPath)
	if err != nil {
		return nil, err
	}
	defer configReader.Close()

	byteValue, err := ioutil.ReadAll(configReader)
	if err != nil {
		return nil, err
	}

	details := Details{}
	json.Unmarshal(byteValue, &details)
	return &details, nil
}

var current_user appUser
var client *mongo.Client

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

	//Insert user in MongoDB if a record does not already exist
	json.NewDecoder(r.Body).Decode(&current_user)
	collection := client.Database("seproj").Collection("student")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	count, err := collection.CountDocuments(context.TODO(), bson.D{{"email", current_user.Email}})
	if count == 0 {
		result, _ := collection.InsertOne(ctx, current_user)
		fmt.Println(result)
	}
	http.Redirect(w, r, "http://localhost:3000/student", http.StatusSeeOther)
}

func func2(w http.ResponseWriter, r *http.Request) {
	gothic.BeginAuthHandler(w, r)
}

func getCurrUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(current_user)
}

func main() {

	fmt.Println("Starting server...")
	// Move this to a config file.
	key := "foo"         // Replace with your SESSION_SECRET or similar
	maxAge := 86400 * 30 // 30 days
	isProd := false      // Set to true when serving over https

	store := sessions.NewCookieStore([]byte(key))
	store.MaxAge(maxAge)
	store.Options.Path = "/"
	store.Options.HttpOnly = true // HttpOnly should always be enabled
	// Bruh no. Pls.
	store.Options.Secure = isProd

	gothic.Store = store

	absPath, _ := os.Getwd()
	absPath = filepath.Join(absPath, "")
	config, err := ReadConfig(filepath.Join(absPath, "google-details.json"))

	goth.UseProviders(
		google.New(config.ClientID, config.ClientSecret, "http://localhost:8080/auth/google/callback", "email", "profile"),
	)

	r := mux.NewRouter()
	r.HandleFunc("/", handlerFunc)
	r.HandleFunc("/auth/{provider}/callback", func1)
	r.HandleFunc("/auth/{provider}", func2)
	r.HandleFunc("/api/currentuser", getCurrUser)
	r.HandleFunc("/api/add_contributor", AddContributor)
	r.HandleFunc("/api/validate_instructor", ValidateInstructor)
	r.HandleFunc("/api/create_lecture", createNewRepo)
	r.HandleFunc("/api/clone_lecture",cloneRepo)
	r.HandleFunc("/api/commit_lecture",commitRepo)
	r.HandleFunc("/api/push_lecture",pushRepo)
	r.HandleFunc("/api/upload",uploadFiles)

	//Mongo Connection Code
	var err1 error
	client, err1 = mongo.NewClient(options.Client().ApplyURI("mongodb+srv://admin:admin@cluster0.5ozca.mongodb.net/seproj?retryWrites=true&w=majority"))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err1 = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)

	err1 = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}

	databases, err := client.ListDatabaseNames(ctx, bson.M{})
	if err1 != nil {
		log.Fatal(err)
	}
	fmt.Println(databases)
	//End of Mongo connection

	http.ListenAndServe(":8080", r)

}
