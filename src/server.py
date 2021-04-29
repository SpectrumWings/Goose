import flask
import os

from flask import Flask, send_from_directory, render_template

class server():
    app = None
    def __init__(self):
        print("memes")
        self.app = Flask(__name__, static_url_path='', static_folder='frontend\\goose\\build\\static', template_folder='frontend\\goose\\build')
        #self.upload_loc = './upload'
        #self.extensions = set(['png', 'jpg', 'jpeg'])

   
    def start_server(self):
        self.app.run(debug=True)

    
    def initialize_api(self):
        @self.app.route("/")
        def hello():
            print("AAAAAAAAAAAAAAAAAAA", self.app.static_folder)
            return flask.render_template('index.html')

        @self.app.route("/uploadImage")
        def uploadImage():
            return "fuck"


