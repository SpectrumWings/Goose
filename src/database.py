import pymongo
import bcrypt
import jwt
import json
import const
from datetime import datetime, timedelta 

class database():
    def __init__(self):
        db = None
        client = None
        user_table = None
        config = None
        

    def intialize(self):
        self.client = pymongo.MongoClient('mongodb://localhost:27017/')
        self.db = self.client["myDatabase"]
        self.config = self.read_json('key.json')
        self.user_table = self.db["Users"]
        self.animal_table = self.db["Animals"]
        self.user_table.create_index( [("email",pymongo.DESCENDING)], unique=True )



    def insertUser(self, email, name, password):
        try:
            salted_pass = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())
            user = {"email": email, "name": name, "password": salted_pass, "session_id": "", "expiry": None}
            result = self.user_table.insert_one(user)
            token = jwt.encode({"user": email}, self.config["key"], algorithm="HS256")
            expiry = datetime.now() + timedelta(hours=1)
            self.user_table.update_one({"email": email}, {"$set": {"session_id": token}}, upsert=False)
            self.user_table.update_one({"email": email}, {"$set": {"expiry": expiry}}, upsert=False)
            return token
        except pymongo.errors.DuplicateKeyError:
            return "dupe"
        except Exception as e:
            print(e)
            return None

    def insertAnimal(self, fileLoc, name, desc = "", authorEmail = "", isGuest = True, guestName = ""):
        if isGuest:
            animal = {"animalName": name, "desc" : desc, "email": "", "guestName": guestName, "guest" : True, "file": fileLoc, "new": False}
        else:
            self.animal_table.update_many({"email": authorEmail}, {"$set": {"new": False}}, upsert=False)
            animal = {"animalName": name, "desc": desc, "email": authorEmail, "guestName": guestName, "guest": False, "file": fileLoc, "new": True}
        res = self.animal_table.insert_one(animal)
        if res:
            return res
        else:
            return False

    

    def findUser(self, value, email):
        query = {value: email}
        return self.user_table.find_one(query)

    def checkLogin(self, email, password):
        res = self.findUser("email", email)
        print(res)
        if (res == None):
            return None
        found = bcrypt.checkpw(password.encode('utf8'), res["password"])
        if found:
            token = jwt.encode({"user": email}, self.config["key"], algorithm="HS256")
            expiry = datetime.now() + timedelta(hours=1)
            self.user_table.update_one({"email": email}, {"$set": {"session_id": token}}, upsert=False)
            self.user_table.update_one({"email": email}, {"$set": {"expiry": expiry}}, upsert=False)
            return token
        else:
            return None

    def getUserAnimals(self, email):
        query = {"email": email}
        animals = list(self.animal_table.find(query))
        print(animals)
        for x in animals:
            x.pop('_id')
        if animals:
            return animals
        else: return None


    def read_json(self, file):
        f = open(file, 'r').read()
        return json.loads(f)
   
    def checkToken(self, token):
        res = self.findUser("session_id", token)
        if (res == None):
         
            return False
        expiry = res["expiry"]
        now = datetime.now()
        if expiry < now:
            return False
        else:
            return True
    