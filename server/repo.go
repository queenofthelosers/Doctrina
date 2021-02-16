package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os/exec"
)

type LectureDetails struct {
	LectureName string `json:"LectureName"`
}

const ShellToUse = "bash"

func Shellout(command string) (error, string, string) {
	var stdout bytes.Buffer
	var stderr bytes.Buffer
	cmd := exec.Command(ShellToUse, "-c", command)
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr
	err := cmd.Run()
	return err, stdout.String(), stderr.String()
}

func createNewRepo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	if r.Method == "POST" {
		var l LectureDetails
		err := json.NewDecoder(r.Body).Decode(&l)
		if err != nil {
			fmt.Println("hello")
			fmt.Println(err)
		}
		lectureName := l.LectureName
		err, out, errout := Shellout("mkdir " + lectureName + " && cd new && git init")
		if err != nil {
			log.Printf("error: %v\n", err)
		}
		fmt.Println("--- stdout ---")
		fmt.Println(out)
		fmt.Println("--- stderr ---")
		fmt.Println(errout)
	}

}
