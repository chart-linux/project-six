from bottle import Bottle, run, static_file, auth_basic
import sys

USERNAME = "user"
PASSWORD = "pass"

app = Bottle()

def check(username, password):
    if username == USERNAME and password == PASSWORD:
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
