from flask import Flask ,request, abort, jsonify
from datetime import datetime
import requests as req
import json
import base64
from PIL import Image
import io
from fer import FER
import cv2

app = Flask(__name__)



@app.route('/image',methods=['POST'])
def image():

	if request.method == "POST":
		detector = FER(mtcnn=True)

		data = request.json
		base64String = data['Image']
		image = base64.b64decode(str(base64String))       
		fileName = 'test.jpeg'

		imagePath = "/home/ubuntu/"+ fileName

		img = Image.open(io.BytesIO(image))
		img.save(imagePath, 'jpeg')

		#FER model code
		img = cv2.imread("/home/ubuntu/test.jpeg")
		print(detector.detect_emotions(img))
		return fileName

        
	else:
		abort(400)

@app.route('/text',methods=['POST'])
def text():

	if request.method == "POST":
		data = request.json
		print(data)
		return jsonify(data)
        
	else:
		abort(400)


if __name__ == '__main__':
	app.run(host='0.0.0.0',port=5000)