import cv2
from deepface import DeepFace

cam = cv2.VideoCapture(0)

cv2.namedWindow("space:Capture | esc:Close")


while True:
    result, img = cam.read()
    if not result:
        print("failed to grab img")
        break
    cv2.imshow("space:Capture | esc:Close", img)

    k = cv2.waitKey(1)
    if k%256 == 27:
        # ESC pressed
        print("Escape hit, closing...")
        break
    elif k%256 == 32:
        # SPACE pressed
        face_cascade = cv2.CascadeClassifier('casscade.xml')
        gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray,1.1,4)

        for (x,y,w,h) in faces:
            cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),3)

        obj = DeepFace.analyze(img_path = img , actions = ['emotion'], enforce_detection=False)
        emotion = obj['dominant_emotion']
        print(emotion)

        txt = 'Emotion: ' + str(emotion)

        # lets add it to the image 
        # fontScale = 0.1
        cv2.putText(img, txt,(0,100),cv2.FONT_HERSHEY_SIMPLEX, 0.5 , (0,0,255), 3 )

        # show the image
        cv2.imshow("img",img)
        # cv2.waitKey()

        cv2.destroyAllWindows()
        break

cam.release()

cv2.destroyAllWindows()