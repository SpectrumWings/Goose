import flask
import os

from flask import *
from flask_cors import CORS
from werkzeug.utils import secure_filename

class server():
    app = None
    model = None
    def __init__(self, model_import, database):
        self.app = Flask(__name__, static_folder='frontend\\goose\\build\\static', template_folder='frontend\\goose\\build')
        self.cors = CORS(self.app)
        self.upload_loc = './server'
        self.extensions = set(['png', 'jpg', 'jpeg'])
        self.model = model_import
        self.database = database

   
    def start_server(self):
        self.app.run(debug=True)


    def initialize_api(self):
        @self.app.route("/")
        def main_page():
            return flask.render_template('index.html')

        @self.app.route("/uploadImage", methods=['POST'])
        def upload_image():
            file_img = request.files['file']
            animal_name = request.form.get('animal')
            filename = secure_filename(file_img.filename)
         
            if filename != '':
                file_img.save(os.path.join(self.upload_loc, filename))

                if self.model:
                    result_animal, result_percents = self.model.determine_image(os.path.join(self.upload_loc, filename))
                    result = self.check_animal(result_animal, result_percents)
            
                    if result in [0,1,2,3,4]:
                        return jsonify(["true", result_animal[result]])
                    else:
                        return jsonify(["false", result_animal[0]])

        @self.app.route("/register", methods=['POST'])
        def registration():
            result = request.get_json()
            print(result['email'])
            token = self.database.insertUser(result['email'], result['name'], result['password'])
            if token == "dupe":
                return make_response(jsonify(["dupe"]))
            if token:
                res = make_response(jsonify(["true", token, result['name']]))
                res.set_cookie('Goose Session', token, max_age=3600, secure=True)
                return res
            else:
                res = make_response(jsonify(["false"]))
                return res

        @self.app.route("/login", methods=['POST'])
        def login():
            result = request.get_json()
            token = self.database.checkLogin(result['email'], result['password'])

            if token:
                user = self.database.findUser("email", result['email'])
                name = user["name"]
                res = make_response(jsonify(["true", token, name]))
                res.set_cookie('Goose Session', token, max_age=3600, secure=True)
                return res
            else:
                res = make_response(jsonify(["false"]))
                return res

        @self.app.route("/checkCookie", methods=['POST'])
        def checkCookie():
            result = request.get_json()
            if (len(result) > 0):
                token = result['token']
                found = self.database.checkToken(token)
                if found:
                    user = self.database.findUser("session_id", token)
                    if user == None:
                        return "false"
                    return jsonify(["true", user["name"], token])
                else:
                    return "false"
            return "false"


    def check_animal(self, animal_list, percent_list):
        for idx, ani in enumerate(animal_list):
            print(percent_list[idx])

            if "cat" in ani or "tabby" in ani or "dog" in ani:
                if percent_list[idx] > 0.6:
                    return idx
        return None
