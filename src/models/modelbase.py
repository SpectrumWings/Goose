import matplotlib.pyplot as plt
import numpy as np
import itertools
import os
import shutil
import random
import glob
from IPython.display import Image

from sklearn.utils import shuffle
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import confusion_matrix

from helpers import *
from const import *

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Activation, Dense, Flatten, BatchNormalization, Conv2D, MaxPool2D
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.models import Model
from tensorflow.keras.metrics import categorical_crossentropy
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import load_model
from tensorflow.keras.applications import imagenet_utils

class modelbase():

    def __init__(self, model_type: str = 'mobile'):
        self.model = None
        self.name = ""
        #gpus = tf.config.experimental.list_physical_devices('GPU') 
        #tf.config.experimental.set_memory_growth(gpus[0], True)

    def mobile_model_setup(self):
        self.model = tf.keras.applications.mobilenet.MobileNet()
        #x = self.model.layers[-model_end_slice].output
        #output = Dense(units=num_possible_results, activation='softmax')(x)
        #self.model = Model(inputs=self.model.input, outputs=output)
        
        
        
        self.name = "mobile"
    
    def lock_layers(self, num):
        for layer in self.model.layers[:-num]:  # try 23
            layer.trainable=False
    
    def load_model(self, path: str):
        self.model = load_model(path)

    def save_model(self, path: str):
        if os.path.isfile(path) is False:
            self.model.save(path)

    def train_model(self, train, valid, test):
        train_batches, valid_batches, test_batches = batch_image_preprocessor(self.name, train, valid, test)
        self.lock_layers(23)

        self.model.compile(optimizer=Adam(learning_rate=learning_rate), loss='categorical_crossentropy', metrics=['accuracy'])
        self.model.fit(x=train_batches, validation_data=valid_batches, epochs=epoch_count, verbose=2)
        

    def determine_image(self, path):
        preprocessed_image = prepare_image(path, 'a')
        
        predictions = self.model.predict(preprocessed_image)
        results = imagenet_utils.decode_predictions(predictions)
        #print(results)
        

        #predicted_class = predictions.argmax(axis=-1)

        # TODO predictions should have its own intepretation tool, expercially hooked to the api
        # Also need to properly define the domain space for the exit layer. This will vary for which model used

        #results = imagenet_utils.decode_predictions(predictions, self.model)

        category_animals = []
        category_percent = []
        for s in results:
            for f in s:
                category_animals.append(f[1])
                category_percent.append(f[2])
        return category_animals, category_percent


    # to do eventually
    def create_own_model(self):
        pass