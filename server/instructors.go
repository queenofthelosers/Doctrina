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
	Courses []string `json:"courses,omitempty" bson:"password,omitempty"`
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
		fmt.Println("found username :",username);
		//passwd := i.Password
		instructorCollection := client.Database("seproj").Collection("instructors")
		ctx,_ := context.WithTimeout(context.Background(),10*time.Second)
		// count,err := instructorCollection.CountDocuments(ctx,bson.D{{"username",username}})
		// if count==0{
		// 	lr := LoginResult{Response : "Failed"}
		// 	json.NewEncoder(w).Encode(&lr)
		// } else {
		// 	var inst Instructor
		// 	cursor, err := instructorCollection.Find(context.TODO(), bson.D{{"username",username}})
		// 	cursor.Next(ctx)
		// 	err = cursor.Decode(&inst)
		// 	if err!=nil{
		// 		fmt.Println(err)
		// 	}
		// 	fmt.Println(inst);
		// 	lr := LoginResult{Response : inst.Password}
		// 	json.NewEncoder(w).Encode(&lr)

		// }
		var instArr []Instructor
		filter := bson.D{
			primitive.E{Key:"username",Value: i.Username},
		}
		cursor,err := instructorCollection.Find(ctx,filter);
		
		if err != nil {
			panic(err)
		}
		if err = cursor.All(ctx, &instArr); err != nil {
			panic(err)
		}
		fmt.Println(instArr)
	
	  // once exhausted, close the cursor
		cursor.Close(ctx)
	
		
	}	
}