from flask import Flask ,request, abort, jsonify 
from datetime import datetime
import requests as req
import json
import base64
from PIL import Image
import io
from fer import FER
import cv2
import requests
import ldadeployment

app = Flask(__name__)



@app.route('/image',methods=['POST'])
def image():

	if request.method == "POST":
		detector = FER(mtcnn=True)
		data = request.json
		base64String = data['Image']

		image = base64.b64decode(str(base64String)) 
		fileName = 'test.jpeg'
		imagePath = "/home/ubuntu/Emotion-Interface/flask-server/"+ fileName
		img = Image.open(io.BytesIO(image))
		img.save(imagePath, 'jpeg')
		img = cv2.imread("/home/ubuntu/Emotion-Interface/flask-server/test.jpeg")

		#FER model code
		try:
			res = detector.detect_emotions(img)[0]['emotions']
			print(res)
		except:
			print("most likely no face in pic")
		req = requests.post("http://43.204.11.138:3001/image", json=res)
		return jsonify(res)
        
	else:
		abort(400)

@app.route('/text',methods=['POST'])
def text():

	if request.method == "POST":
		data = request.json		
		#print(ldadeployment.topic_predictor(data["content_string"]))

		try:
			res1 = ldadeployment.topic_predictor(data["content_string"])
			print(res1)
		except:
			print("Error")
		req1 = requests.post("http://43.204.11.138:3001/Text", json=res1)

		#print(type(data["content_string"]))
		return jsonify(data)
        
	else:
		abort(400)


if __name__ == '__main__':
	app.run(host='0.0.0.0',port=5000)
