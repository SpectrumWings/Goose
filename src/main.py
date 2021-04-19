import sys
import json
from models.modelbase import modelbase

class main:
    def __init__(self):
        config = self.read_json('config.json')
        self.model = modelbase()
        self.setup_system(config)
       
    
    def setup_system(self, config):
        loaded = False
        inputs = ""
        print("*****************************************************")
        inputs = input("Setup ---- What model to use?\n\nMOBILE = user mobilenet\nLOAD = load from file\n")
        while not loaded and inputs != 'q':
            if inputs == "MOBILE":
                try:
                    self.model.mobile_model_setup()
                    loaded = True
                except Exception as e:
                    print(e)
            
            elif inputs == "LOAD":
                print("Loading model from config")

                try:
                    print(config['model_location'])
                    self.model.load_model(config['model_location'])
                    print("Load sucessful")
                    loaded = True

                except :
                    print("Unable to load model, please retry")
            if not loaded: inputs = input()

        while inputs != 'q':
            inputs = input("What to do?\n\na = train model \nb = test image\nc = start server\nd = save model\nq = quit\n")

            if inputs == 'a':
                self.train_model(config)
            elif inputs == 'b':
                pass
            elif inputs == 'c':
                pass


    def read_json(self, file):
        f = open(file, 'r').read()
        return json.loads(f)

    def train_model(self, config):
        self.model.train_model(config['train_path'], config['valid_path'], config['test_path'])

if __name__ == "__main__":
    main()