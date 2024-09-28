import cv2
import face_recognition
import numpy as np
import pandas as pd
import os
def func1():
    # Load the video file
    video_path = "videos/vid1.mp4"
    video_capture = cv2.VideoCapture(video_path)



    # Step 1: Load the training images and learn how to recognize them
    known_face_encodings = []
    known_face_names = []

    # Directory where your training images are stored
    known_people_dir = 'images'

    # Load each image in the training directory
    for image_name in os.listdir(known_people_dir):
        image_path = os.path.join(known_people_dir, image_name)
        # Load the image using face_recognition
        image = face_recognition.load_image_file(image_path)
        # Get the face encodings for the first face in the image
        encoding = face_recognition.face_encodings(image)[0]
        known_face_encodings.append(encoding)
        # Extract the name from the image filename (assumes format 'name.jpg')
        name = os.path.splitext(image_name)[0]
        known_face_names.append(name)

    students = known_face_names.copy()




    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')


    recognized_faces = []
    while video_capture.isOpened():
        # Capture frame-by-frame
        ret, frame = video_capture.read()

        if not ret:
            # print("not ret")
            break

        rgb_frame = np.array(frame[:, :, ::-1])


        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)


            if True:
                face_locations = face_recognition.face_locations(rgb_frame)
                face_encodings = face_recognition.face_encodings(rgb_frame,face_locations)
                face_names = []
                for face_encoding in face_encodings:
                    matches = face_recognition.compare_faces(known_face_encodings,face_encoding)
                    name = ""
                    face_distance = face_recognition.face_distance(known_face_encodings,face_encoding)
                    best_match_index = np.argmin(face_distance)
                    if matches[best_match_index]:
                        name = known_face_names[best_match_index]

                    face_names.append(name)
                    if name in known_face_names:
                        if name in students:
                            print(name)
                            recognized_faces.append(name)
                            students.remove(name)
                                # print(students)
                                # curr_time = now.strftime("%H-%M-%S")
                            # lnwriter.writerow([name,current_time])

            cv2.imshow("Attendacnce System",frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break  

    # Release the video capture and video writer objects
    video_capture.release()
    # out.release()

    # Close all OpenCV windows
    cv2.destroyAllWindows()

    recognized_faces = list(set(recognized_faces))

    # Save the names to a CSV file
    df = pd.DataFrame(recognized_faces, columns=['Name'])
    df.to_csv("output.csv", index=False)

    print(f"Recognized faces have been saved .")

