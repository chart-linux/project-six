from bottle import Bottle, run, static_file, auth_basic
import sys
import json

with open("./pass.js","r") as p:
    dictionary = json.loads(p.read())
    ID       = dictionary["id"]
    PASSWORD = dictionary["pass"]

app = Bottle()

def check(_id, password):
    if _id == ID and password == PASSWORD:
        return True
    else:
        return False

@app.route("/")
@auth_basic(check)
def six():
    return open("./static/index.html").read()

@app.route("/static/<filename:path>")
@auth_basic(check)
def static_dir(filename):
    return static_file(filename, root="./static")
    
run(app, host="0.0.0.0", port=int(sys.argv[1]))
