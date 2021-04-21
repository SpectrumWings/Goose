import flask

from flask import Flask

class server():
    app = None
    def __init__(self):
        self.app = Flask(__name__, static_folder='')

    def start_server(self):
        self.app.run()

    #------------------------- API Below ----------------------

    @app.route('/')
    def index():
        return 'TODO'