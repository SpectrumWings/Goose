import flask

from flask import Flask

class server():
    app = None
    def __init__(self):
        print("memes")
        self.app = Flask(__name__)

   
    def start_server(self):
        self.app.run(debug=True)

    def initialize_api(self):
        def hello():
            return "hello"

        self.app.add_url_rule("/", "hello", hello)


    #------------------------- API Below ----------------------

   
    # @app.route('/')
    # def index():
    #     return "Succ"

