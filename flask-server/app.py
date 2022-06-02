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
from sklearn.linear_model import LogisticRegression



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
			box = detector.detect_emotions(img)[0]['box']
			x = box[0]
			y = box[1]
			w = box[2]
			h = box[3]	
			photo = img[y:y + h, x:x + w]	
			cv2.imwrite("/home/ubuntu/Emotion-Interface/flask-server/photo.jpeg", photo)
			print("The image output is redirected to node app.............")
		except:
			print("most likely no face in pic")


		with open("photo.jpeg","rb") as img_file:
			b64_string = base64.b64encode(img_file.read())
		photo_binary = b64_string.decode('utf-8')

		res['image'] = photo_binary
		#print(res)
		#print(type(photo_binary))
		req = requests.post("http://43.204.11.138:3500/image", json=res)
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
		req1 = requests.post("http://43.204.11.138:3500/text-db", json=res1)

		#print(type(data["content_string"]))
		return jsonify(data)
        
	else:
		abort(400)

@app.route('/sentiment',methods=['POST'])
def sentiment():
	if request.method == "POST":
		data = request.json	
		try:
			result_senti = ldadeployment.create_reg(data["content_string"])
			print(result_senti)
		except Exception as e:
			print(e)
		senti_req = requests.post("http://43.204.11.138:3500/sentiment-db", json=result_senti)
		return jsonify(data)
        
	else:
		abort(400)



if __name__ == '__main__':
	app.run(host='0.0.0.0',port=4000)
