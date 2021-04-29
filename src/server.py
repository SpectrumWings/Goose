import flask
import os

from flask import *
from werkzeug.utils import secure_filename

class server():
    app = None
    model = None
    def __init__(self, model_import):
        print("memes")
        self.app = Flask(__name__, static_folder='frontend\\goose\\build\\static', template_folder='frontend\\goose\\build')
        self.upload_loc = './server'
        self.extensions = set(['png', 'jpg', 'jpeg'])
        self.model = model_import

   
    def start_server(self):
        self.app.run(debug=True)


    def initialize_api(self):
        @self.app.route("/")
        def main_page():
            return flask.render_template('index.html')

        @self.app.route("/uploadImage", methods=['POST'])
        def upload_image():
            print(request.files)
            file_img = request.files['file']
            filename = secure_filename(file_img.filename)
         
            if filename != '':
                file_img.save(os.path.join(self.upload_loc, filename))

                # print('AAAAAAAAAAAAAAAAAAAAAAAAA')
                # print(os.path.join(self.upload_loc, filename))
                if self.model:
                    result_animal, result_percents = self.model.determine_image(os.path.join(self.upload_loc, filename))
                    print(result_animal)
                    print(result_percents)
            return result_animal[0]


