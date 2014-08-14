from bottle import Bottle, run, static_file

app = Bottle()

@app.route("/")
def six():
    return open("/static/html/index.html").read()

@app.route("/static/<filename:path>")
def static_dir(filename):
    return static_file(filename, root="./static")

run(app, host="localhost", port=8080)
