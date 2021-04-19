import matplotlib.pyplot as plt
import numpy as np
import itertools
import os
import shutil
import random
import glob
import warnings
from IPython.display import Image

from sklearn.utils import shuffle
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import confusion_matrix

from helpers import *

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



# train_labels = []
# train_samples = []

# for i in range(50):
#     random_younger = randint(13, 64)
#     train_samples.append(random_younger)
#     train_labels.append(1)

#     random_older = randint(65, 100)
#     train_samples.append(random_older)
#     train_labels.append(0)

# for i in range(1000):
#     random_younger = randint(13, 64)
#     train_samples.append(random_younger)
#     train_labels.append(0)

#     random_older = randint(65, 100)
#     train_samples.append(random_older)
#     train_labels.append(1)

# train_labels = np.array(train_labels)
# train_samples = np.array(train_samples)
# train_samples, train_labels = shuffle(train_samples, train_labels)

# scaler = MinMaxScaler(feature_range=(0,1))
# scaled_train_samples = scaler.fit_transform(train_samples.reshape(-1, 1))

# #physical_devices = tf.config.experimental.list_physical_devices('GPU')
# #tf.config.experimental.set_memory_growth(physical_devices[0], True)

# model = Sequential([
#     Dense(units=16, input_shape=(1,), activation='relu'),
#     Dense(units=32, activation='relu'),
#     Dense(units=2, activation='softmax')
# ])

# #model.summary()

# model.compile(optimizer=Adam(learning_rate=0.0001), loss='sparse_categorical_crossentropy', metrics=['accuracy'])
# model.fit(x=scaled_train_samples, y=train_labels, validation_split=0.1, batch_size=10, epochs=30, shuffle=True, verbose=2)

# #validation split occurs before the shuffle
# # shuffle before you fit

# #test set:
# test_labels = []
# test_samples = []

# for i in range(50):
#     random_younger = randint(13, 64)
#     test_samples.append(random_younger)
#     test_labels.append(1)

#     random_older = randint(65, 100)
#     test_samples.append(random_older)
#     test_labels.append(0)

# for i in range(1000):
#     random_younger = randint(13, 64)
#     test_samples.append(random_younger)
#     test_labels.append(0)

#     random_older = randint(65, 100)
#     test_samples.append(random_older)
#     test_labels.append(1)

# test_labels = np.array(test_labels)
# test_samples = np.array(test_samples)
# test_samples, test_labels = shuffle(test_samples, test_labels)

# scaler = MinMaxScaler(feature_range=(0,1))
# scaled_test_samples = scaler.fit_transform(test_samples.reshape(-1, 1))

# predictions = model.predict(x=scaled_test_samples, batch_size=10, verbose=0)

# rounded_predictions = np.argmax(predictions, axis=-1)

# for i in predictions:
#     print(i)

# cm = confusion_matrix(y_true=test_labels, y_pred=rounded_predictions)
# cm_plot_labels = ['no side effects', 'has side effects']
# #pcm(cm, cm_plot_labels, "Matrix")
# print(cm)


# if os.path.isfile('models/t1.h5') is False:
#     model.save('models/t1.h5')

# new_model = load_model('models/t1.h5')

#images - convultional neural network



#print("Num GPUs Available: ", len(tf.config.list_physical_devices('GPU')))

# os.chdir('data/cvd')
# if os.path.isdir('train/dog') is False:
#     os.makedirs('train/cat')
#     os.makedirs('train/dog')
#     os.makedirs('valid/cat')
#     os.makedirs('valid/dog')
#     os.makedirs('test/cat')
#     os.makedirs('test/dog')

#     for c in random.sample(glob.glob('cat*'), 500):
#         shutil.move(c, 'train/cat')
#     for c in random.sample(glob.glob('dog*'), 500):
#         shutil.move(c, 'train/dog')
#     for c in random.sample(glob.glob('cat*'), 100):
#         shutil.move(c, 'valid/cat')
#     for c in random.sample(glob.glob('dog*'), 100):
#         shutil.move(c, 'valid/dog')
#     for c in random.sample(glob.glob('cat*'), 50):
#         shutil.move(c, 'test/cat')
#     for c in random.sample(glob.glob('dog*'), 50):
#         shutil.move(c, 'test/dog')

###################################################################

# train_path = './data/cvd/train'
# valid_path = './data/cvd/valid'
# test_path = './data/cvd/test'

# train_batches = ImageDataGenerator(preprocessing_function=tf.keras.applications.vgg16.preprocess_input).flow_from_directory(directory=train_path, target_size=(224, 224), classes=['cat', 'dog'], batch_size=10)
# valid_batches = ImageDataGenerator(preprocessing_function=tf.keras.applications.vgg16.preprocess_input).flow_from_directory(directory=valid_path, target_size=(224, 224), classes=['cat', 'dog'], batch_size=10)
# test_batches = ImageDataGenerator(preprocessing_function=tf.keras.applications.vgg16.preprocess_input).flow_from_directory(directory=test_path, target_size=(224, 224), classes=['cat', 'dog'], batch_size=10, shuffle = False)
# you do not shuffle for test as it must know which one is correct

# imgs, labels = next(train_batches)

# plotImages(imgs)
# print(labels)

# model = Sequential([
#     Conv2D(filters=32, kernel_size=(3, 3), activation='relu', padding = 'same', input_shape=(224, 224, 3)),
#     MaxPool2D(pool_size=(2,2), strides=2),
#     Conv2D(filters=64, kernel_size=(3, 3), activation='relu', padding = 'same'),
#     MaxPool2D(pool_size=(2,2), strides=2),
#     Flatten(),
#     Dense(units=2, activation='softmax')
# ])

# model.summary()

# model.compile(optimizer=Adam(learning_rate=0.0001), loss='categorical_crossentropy', metrics=['accuracy'])
# model.fit(x=train_batches, validation_data=valid_batches, epochs=10, verbose=2)
# # don't need y here since the images have the corresponding animal to the image


# # increase filters as u go along

# test_imgs, test_labels = next(test_batches)
# plotImages(test_imgs)
# #print(test_labels)

# predictions = model.predict(x=test_batches, verbose=0)
# print(np.round(predictions))

# cm = confusion_matrix(y_true=test_batches.classes, y_pred=np.argmax(predictions,axis=-1))
# pcm(cm=cm, classes=['cat', 'dog'], title = "confusion matrix")

########################################################
# now a model using vgg16

# vgg16_model = tf.keras.applications.vgg16.VGG16()

# model = Sequential()
# for layer in vgg16_model.layers[:-1]:
#     model.add(layer)

# for layer in model.layers:
#     layer.trainable = False

# model.add(Dense(units=2, activation='softmax'))

# model.compile(optimizer=Adam(learning_rate=0.0001), loss='categorical_crossentropy', metrics=['accuracy'])

# #model.fit(x=train_batches, validation_data=valid_batches, epochs=5, verbose=2)
# #params = count_params(model)

# predictions = model.predict(x=test_batches,verbose=0)
# print(predictions)
#cm = confusion_matrix(y_true=test_batches.classes, y_pred=np.argmax(preductuibs, axis=-1))
#pcm(cm=cm, classes=['cat', 'dog'], title="confusion matrix")

################################################################################
# MobileNet model
mobile = tf.keras.applications.mobilenet.MobileNet()

# preprocessed_image = prepare_image('g.jpeg')
# predictions = mobile.predict(preprocessed_image)
# results = imagenet_utils.decode_predictions(predictions)

# for s in results:
#     for f in s:
#         print(f[1])

# os.chdir('data/refine')
# if os.path.isdir('train/0') is False:
#     os.mkdir('train')
#     os.mkdir('valid')
#     os.mkdir('test')

# for i in range (0,10):
#     shutil.move(f'{i}', 'train')
#     os.mkdir(f'valid/{i}')
#     os.mkdir(f'test/{i}')

#     valid_samples = random.sample(os.listdir(f'train/{i}'), 30)
#     for j in valid_samples:
#         shutil.move(f'train/{i}/{j}', f'valid/{i}')

#     test_samples = random.sample(os.listdir(f'train/{i}'), 5)
#     for k in test_samples:
#         shutil.move(f'train/{i}/{k}', f'test/{i}')

# os.chdir('../..')

train_path = './data/refine/train'
valid_path = './data/refine/valid'
test_path = './data/refine/test'

train_batches = ImageDataGenerator(preprocessing_function=tf.keras.applications.mobilenet.preprocess_input).flow_from_directory(directory=train_path, target_size=(224, 224), batch_size=10)
valid_batches = ImageDataGenerator(preprocessing_function=tf.keras.applications.mobilenet.preprocess_input).flow_from_directory(directory=valid_path, target_size=(224, 224), batch_size=10)
test_batches = ImageDataGenerator(preprocessing_function=tf.keras.applications.mobilenet.preprocess_input).flow_from_directory(directory=test_path, target_size=(224, 224), batch_size=10, shuffle = False)

x = mobile.layers[-6].output
output = Dense(units=10, activation='softmax')(x)
# store everything from x to output

model = Model(inputs=mobile.input, outputs=output)

for layer in model.layers[:-23]:
    layer.trainable=False

model.compile(optimizer=Adam(learning_rate=0.0001), loss='categorical_crossentropy', metrics=['accuracy'])

model.fit(x=train_batches, validation_data=valid_batches, epochs=30, verbose=2)

