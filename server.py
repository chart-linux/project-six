from bottle import Bottle, run, static_file
import sys

app = Bottle()

@app.route("/")
def six():
    return open("./static/index.html").read()

@app.route("/static/<filename:path>")
def static_dir(filename):
    return static_file(filename, root="./static")

run(app, host="0.0.0.0", port=int(sys.argv[1]))
