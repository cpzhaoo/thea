import sys
import os
import glob
import re
import numpy as np 

from fastai import *
from fastai.vision import *

import cv2

from flask import Flask, render_template, Response, request, redirect, url_for
import pickle
from werkzeug.utils import secure_filename
from gevent.pywsgi import WSGIServer



app = Flask(__name__)

# import our model with pickle
#model = pickle.load(open('templates/app_home/export.pkl', 'rb'))


def model_predict(img_path):
    original = cv2.imread(img_path)
    numpy_image = np.asarray(original)
    preds = learn.predict(original)
    os.remove(img_path)

    return preds

@app.route("/")
def home():
    return render_template("app_home/index.html")

@app.route("/upload_file", methods=['GET'])
def upload_file():
    return render_template("app_home/predict.html")

@app.route('/predict', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        f = request.files['image']
        print(f)
        print(f.filename)
        # save file to uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'templates/uploads', secure_filename(f.filename))
        f.save(file_path)

        preds = model_predict(file_path)
        
        print(f"preds: {preds}")
        return preds
        #pred_class = decode_predictions(preds, top=1)
    else:
        return 'ok'

if __name__ == "__main__":
    app.run(debug=True)