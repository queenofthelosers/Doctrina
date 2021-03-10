package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"
	"os/user"
	"path/filepath"
	"io/ioutil"
	"time"
	"github.com/go-git/go-git/v5"
	githttp "github.com/go-git/go-git/v5/plumbing/transport/http"
	"github.com/go-git/go-git/v5/plumbing/object"
)

type LectureDetails struct {
	LectureName     string `json:"LectureName"`
	LectureMarkdown string `json:"LectureMarkdown,omitempty"`
}

var classPath string
var homeDir string

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

func gitCloner() {
	absPath, _ := os.Getwd()
	absPath = filepath.Join(absPath, "")
	url := "https://github.com/queenofthelosers/classes-repo.git"
	config, err := ReadConfig(filepath.Join(absPath, "google-details.json"))
	token := config.GitAccessToken

	out, err := git.PlainClone(classPath, false, &git.CloneOptions{
		// The intended use of a GitHub personal access token is in replace of your password
		// because access tokens can easily be revoked.
		// https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/
		Auth: &githttp.BasicAuth{
			Username: "abc123", // yes, this can be anything except an empty string
			Password: token,
		},
		URL:      url,
		Progress: os.Stdout,
	})
	fmt.Println(out)
	if err != nil {
		fmt.Println("error ", err)
	}
}

func gitCommitter() {
	directory := "C:/Users/Deepak George/dev/classes/";
	r, err := git.PlainOpen(directory)
	if err!=nil{
		fmt.Println(err);
	}
	w, err := r.Worktree()
	if err!=nil{
		fmt.Println(err);
	}
	
	fname :=  filepath.Join(directory, "example-gie")
	err = ioutil.WriteFile(fname, []byte("hello world!"), 0644)
	if err!=nil{
		fmt.Println(err);
	}
	_, err = w.Add("example-gie")
	if err!=nil{
		fmt.Println("Error here ", err)
	}
	commit, err := w.Commit("example go-git commit", &git.CommitOptions{
		Author: &object.Signature{
			Name:  "John Doe",
			Email: "john@doe.org",
			When:  time.Now(),
		},
	})
	obj, err := r.CommitObject(commit)
	if err!=nil{
		fmt.Println(err);
	}
	fmt.Println(obj);
}

func gitPusher() {
	directory := "C:/Users/Deepak George/dev/classes";
	r, err := git.PlainOpen(directory)
	if err!=nil{
		fmt.Println(err);
	}
	absPath, _ := os.Getwd()
	absPath = filepath.Join(absPath, "")
	config, err := ReadConfig(filepath.Join(absPath, "google-details.json"))
	token := config.GitAccessToken
	err = r.Push(&git.PushOptions{
		Auth: &githttp.BasicAuth{
			Username: "abc123", // yes, this can be anything except an empty string
			Password: token,
		},
	})
	if err!=nil{
		fmt.Println("error here :",err);
	}
}

func createNewRepo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	usr, err := user.Current()
	if err != nil {
		log.Fatal(err)
	}
	homeDir = usr.HomeDir
	classPath = homeDir + "/dev/classes"
	if r.Method == "POST" {
		var l LectureDetails
		err1 := json.NewDecoder(r.Body).Decode(&l)
		if err1 != nil {
			fmt.Println("hello")
			fmt.Println(err1)
		}
		var out, errout string
		var err error
		err, out, errout = Shellout("cd " + homeDir + "/dev" + " && find classes")
		if err != nil {
			log.Printf("error: %v\n", err)
		}
		fmt.Println("--- stdout ---")
		fmt.Println(out)
		fmt.Println("--- stderr ---")
		fmt.Println(errout)
		if errout[0] == 'f' {
			gitCloner()
		}
		lectureName := l.LectureName
		err, out, errout = Shellout("cd " + classPath + " && mkdir " + lectureName + " && cd " + lectureName)
		if err != nil {
			log.Printf("error: %v\n", err)
		}
		fmt.Println("--- stdout ---")
		fmt.Println(out)
		fmt.Println("--- stderr ---")
		fmt.Println(errout)
		lectureMarkdown := l.LectureMarkdown
		fileName := lectureName + ".xml"
		filePath, _ := filepath.Abs("/home/harshvardhan/dev/classes/" + lectureName + "/" + fileName)
		file, err := os.Create(filePath)
		if err != nil {
			log.Fatalf("failed creating file: %s", err)
		}
		defer file.Close()
		len, err1 := file.WriteString(lectureMarkdown)
		if err1 != nil {
			log.Fatalf("failed writing to file: %s", err)
		}
		fmt.Printf("\nFile Name: %s", file.Name())
		fmt.Printf("\nLength: %d bytes", len)
	}

}

func cloneRepo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	if r.Method == "POST" {
		// var l LectureDetails
		// err := json.NewDecoder(r.Body).Decode(&l)
		// if err != nil {
		// 	fmt.Println("hello")
		// 	fmt.Println(err)
		// }
		// lectureName := l.LectureName
		gitCloner()
	}
}

//dummy router fx to test commit is working or no
func commitRepo(w http.ResponseWriter, r *http.Request){
	w.Header().Set("content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	if r.Method == "POST" {
		gitCommitter();
	}
}

//dummy router fx to test push is working or no

func pushRepo(w http.ResponseWriter, r *http.Request){
	w.Header().Set("content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	if r.Method == "POST" {
		gitPusher();
	}
}
