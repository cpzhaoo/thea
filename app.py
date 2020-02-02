from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("app_home/index.html")

@app.route("/salvador")
def salvador():
    return "Hello, Salvador"

if __name__ == "__main__":
    app.run(debug=True)