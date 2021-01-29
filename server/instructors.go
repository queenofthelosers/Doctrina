package main

import(
	"encoding/json"
	"net/http"
	"fmt"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/bson"
	"context"
	"time"

	//"github.com/gorilla/mux"
	//"go.mongodb.org/mongo-driver/mongo"
)

type Instructor struct{
	ID primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Username string	`json:"username,omitempty" bson:"username,omitempty"`  
	Password string `json:"password,omitempty" bson:"password,omitempty"`
	//Courses []string `json:"courses,omitempty" bson:"password,omitempty"`
}

type LoginResult struct{
	Response string `json:"response,omitempty"`
}

func CreateInstructor(w http.ResponseWriter,r *http.Request){
	w.Header().Add("content-type","application/json")
	instructor1 := Instructor{Username : "deepak",Password: "123"}
	fmt.Println(r.Body);
	json.NewDecoder(r.Body).Decode(&instructor1)
	fmt.Println(instructor1)
	collection := client.Database("seproj").Collection("instructors")
	ctx,_ := context.WithTimeout(context.Background(),10*time.Second)
	result,_ := collection.InsertOne(ctx, instructor1)
	json.NewEncoder(w).Encode(result);

}

func ValidateInstructor(w http.ResponseWriter,r *http.Request){
	w.Header().Set("content-type","application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
    w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	if r.Method == "POST"{	
		var i Instructor
		err := json.NewDecoder(r.Body).Decode(&i)
		if err != nil{
			fmt.Println("hello")
			fmt.Println(err);
		}
		fmt.Println(i);
		username := i.Username;
		passwd := i.Password
		//fmt.Println("found username :",username);
		instructorCollection := client.Database("seproj").Collection("instructors")
		var j Instructor;
		err = instructorCollection.FindOne(context.TODO(),bson.M{"username":username}).Decode(&j);
		if err!=nil{
			lr := LoginResult{"Failed"}
			json.NewEncoder(w).Encode(lr);
		} else{
			fmt.Println(j);
			if(passwd == j.Password){
				lr := LoginResult{"Success"};
				json.NewEncoder(w).Encode(lr);
			} else{
				lr := LoginResult{"Failed"};
				json.NewEncoder(w).Encode(lr);
			}
		}
		//passwd := i.Password
		
		//ctx,_ := context.WithTimeout(context.Background(),10*time.Second)
		
	
	}	
}