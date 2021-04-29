import sys
import json
from models.modelbase import modelbase
from server import server

class main:
    def __init__(self):
        config = self.read_json('config.json')
        self.model = modelbase()
        self.setup_system(config)
        self.server = None
       
    
    def setup_system(self, config):
        loaded = False
        inputs = ""
        server_running = False

        # TODO add a default load setup for when running on server
        print("*****************************************************")
        inputs = input("Setup ---- What model to use?\n\m = user mobilenet\nl = load from file\n")
        #while not loaded and inputs != 'q':
        if inputs == "m":
            try:
                self.model.mobile_model_setup()
                loaded = True
            except Exception as e:
                print(e)
        
        elif inputs == "l":
            
            inputs = input("Enter model name:\n")

            try:
                print("Loading model from config")
                print(config['model_location'] + inputs)
                self.model.load_model(config['model_location'] + inputs)
                print("Load sucessful")
                loaded = True

            except Exception as e:
                print("e")
            #if not loaded: inputs = input()

        #while inputs != 'q' or not server_running:
        inputs = input("What to do?\n\na = train model \nb = test image\nc = start server\nd = save model\nq = quit\n")

        # model training
        if inputs == 'a':
            self.train_model(config)

        # test model on image
        elif inputs == 'b':
            inputs = input("Enter test file path:\n")

            try:
                result_animal, result_percents = self.model.determine_image(inputs)
                print(result_animal)
                print(result_percents)
            except Exception as e:
                print(e)
        
        # start flask server
        elif inputs == 'c':
            server_running = True
            self.server = server(self.model)
            self.server.initialize_api()
            self.server.start_server()
            
            

        # save model
        elif inputs == 'd':
            inputs = input("Save model name?\n")
            print('Saving model to save location in config')
            try:
                self.model.save_model(config['save_path']+inputs)
                print("Model save sucessful")
            except:
                print("Error in saving model")
                


    def read_json(self, file):
        f = open(file, 'r').read()
        return json.loads(f)

    def train_model(self, config):
        self.model.train_model(config['train_path'], config['valid_path'], config['test_path'])

if __name__ == "__main__":
    main()