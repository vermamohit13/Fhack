import pickle
import librosa
import soundfile
import pickle
import numpy as np
import speech_recognition as sr

def extract_feature(file_name, mfcc, chroma, mel):
    with soundfile.SoundFile(file_name) as sound_file:
        X = sound_file.read(dtype="float32")
        sample_rate = sound_file.samplerate
        if chroma:
            stft = np.abs(librosa.stft(X))
            result = np.array([])
        if mfcc:
            mfccs = np.mean(librosa.feature.mfcc(
                y=X, sr=sample_rate, n_mfcc=40).T, axis=0)
            result = np.hstack((result, mfccs))
        if chroma:
            chroma = np.mean(librosa.feature.chroma_stft(
                S=stft, sr=sample_rate).T, axis=0)
            result = np.hstack((result, chroma))
        if mel:
            mel = np.mean(librosa.feature.melspectrogram(
                X, sr=sample_rate).T, axis=0)
            result = np.hstack((result, mel))
    return result


model = pickle.load(open("model.sav", 'rb'))
recognizer = sr.Recognizer()
with sr.Microphone() as source:
    print('Clearing background noise...')
    recognizer.adjust_for_ambient_noise(source, duration=1)
    print('Waiting for your message...')
    recordedaudio = recognizer.listen(source)
    print(recordedaudio)
    with open('testing.wav','wb') as f:
        f.write(recordedaudio.get_wav_data())
    print('Done recording..')


try:
    print('Printing the message..')
    text = recognizer.recognize_google(recordedaudio, language='en-US')
    print('Your message:{}'.format(text))
except Exception as ex:
    print(ex)

feature = extract_feature('testing.wav', mfcc=True, chroma=True, mel=True)
testit = []
testit.append(feature)
y = model.predict(testit)
print(y)
