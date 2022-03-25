from fer import FER
import cv2
detector = FER(mtcnn=True,tfserving=True)
img = cv2.imread("/home/ubuntu/testimg.jpg")
detector = FER()
print(detector.detect_emotions(img))
