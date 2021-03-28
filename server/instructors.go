package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	//"github.com/gorilla/mux"
	//"go.mongodb.org/mongo-driver/mongo"
)

type Instructor struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Username    string             `json:"username,omitempty" bson:"username,omitempty"`
	Password    string             `json:"password,omitempty" bson:"password,omitempty"`
	IC          bool               `json:"ic,omitempty" bson:"ic,omitempty"`
	Contributor bool               `json:"contributor,omitempty" bson:"contributor,omitempty"`
	//Courses []string `json:"courses,omitempty" bson:"password,omitempty"`
}

type LoginResult struct {
	Response string `json:"response,omitempty"`
}

type UploadConfig struct {
	Files []string
}

func isFileUploaded(upFile string) bool {
	config_file, _ := os.Open("uploadconfig.json")
	defer config_file.Close()
	decoder := json.NewDecoder(config_file)
	configuration := UploadConfig{}
	err := decoder.Decode(&configuration)
	if err != nil {
		fmt.Println("error:", err)
	}
	for i := 0; i < len(configuration.Files); i++ {
		if configuration.Files[i] == upFile {
			return true
		}
	}
	return false
}

func updateConfig(upfile string) {
	config_file, _ := os.Open("uploadconfig.json")
	defer config_file.Close()
	decoder := json.NewDecoder(config_file)
	configuration := UploadConfig{}
	err := decoder.Decode(&configuration)
	if err != nil {
		fmt.Println("error:", err)
	}
	configuration.Files = append(configuration.Files, upfile)
	bs, err := json.Marshal(configuration)
	if err != nil {
		fmt.Println("error:", err)
	}
	ioutil.WriteFile("uploadconfig.json", bs, 0644)
}

func CreateInstructor(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("content-type", "application/json")
	instructor1 := Instructor{Username: "deepak", Password: "123"}
	fmt.Println(r.Body)
	json.NewDecoder(r.Body).Decode(&instructor1)
	fmt.Println(instructor1)
	collection := client.Database("seproj").Collection("instructors")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	result, _ := collection.InsertOne(ctx, instructor1)
	json.NewEncoder(w).Encode(result)

}

func AddContributor(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	if r.Method == "POST" {
		var i Instructor
		err := json.NewDecoder(r.Body).Decode(&i)
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println(i)
		collection := client.Database("seproj").Collection("instructors")
		ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
		count, err := collection.CountDocuments(context.TODO(), bson.D{{"username", i.Username}})
		if count == 0 {
			lr := LoginResult{"Failed"}
			json.NewEncoder(w).Encode(lr)

		} else {
			fmt.Println("user Found")
			//update the details of the user
			result, err := collection.UpdateOne(
				ctx,
				bson.M{"username": i.Username},
				bson.D{
					{"$set", bson.D{{"contributor", true}}},
				},
			)
			if err != nil {
				fmt.Println("Error :", err)
			}
			fmt.Printf("Updated %v Documents!\n", result.ModifiedCount)
			lr := LoginResult{"Success"}
			json.NewEncoder(w).Encode(lr)

		}
	}
}

func ValidateInstructor(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	if r.Method == "POST" {
		var i Instructor
		err := json.NewDecoder(r.Body).Decode(&i)
		if err != nil {
			fmt.Println("hello")
			fmt.Println(err)
		}
		username := i.Username
		passwd := i.Password
		instructorCollection := client.Database("seproj").Collection("instructors")
		var j Instructor
		err = instructorCollection.FindOne(context.TODO(), bson.M{"username": username}).Decode(&j)
		if err != nil {
			lr := LoginResult{"Failed"}
			json.NewEncoder(w).Encode(lr)
		} else {
			fmt.Println(j)
			if passwd == j.Password {
				lr := LoginResult{"Success"}
				json.NewEncoder(w).Encode(lr)
			} else {
				lr := LoginResult{"Failed"}
				json.NewEncoder(w).Encode(lr)
			}
		}

	}
}

func uploadFiles(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	if r.Method == "POST" {
		err := r.ParseMultipartForm(20 * 1024 * 1024)
		if err != nil {
			fmt.Fprintln(w, err)
			return
		}

		formdata := r.MultipartForm

		files := formdata.File["multiplefiles"]

		for i, _ := range files {
			file, err := files[i].Open()
			defer file.Close()
			if err != nil {
				fmt.Fprintln(w, err)
				return
			}
			upfile := files[i].Filename
			if !isFileUploaded(upfile) {
				out, err := os.Create("files/" + files[i].Filename) //writes into files directory,make files directory
				defer out.Close()
				if err != nil {
					fmt.Println(err)
					fmt.Fprintf(w, "Unable to create the file for writing. Check your write access privilege")
					return
				}

				_, err = io.Copy(out, file)

				if err != nil {
					fmt.Fprintln(w, err)
					return
				}

				fmt.Fprintf(w, "Files uploaded successfully : ")
				fmt.Fprintf(w, files[i].Filename+"\n")
				updateConfig(upfile)
			} else {
				fmt.Println("File already uploaded.")
			}

		}
	}
}
