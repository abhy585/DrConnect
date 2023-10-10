import json
import sys
import joblib
import numpy as np
import os
current_directory = os.getcwd()

#print("start " + current_directory + " end")

#print("array "+ sys.argv[1]+" end")
arr="["+sys.argv[1]+"]";
#print("array "+ arr +" end")
input_data = json.loads(arr)

list_symptoms_binary=input_data
#print("start " + list_symptoms_binary + " end")
#list_symptoms_binary= [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]
patient_np= np.array(list_symptoms_binary)
patient_reshaped= patient_np.reshape(1,-1)
#print(patient_reshaped)
# Load the model from the .pkl file
#model = joblib.load(current_directory + r'\naivebayes.pkl')


model_path = os.path.join(current_directory, 'diseaseprediction', 'naivebayes.pkl')
model = joblib.load(model_path)

# Use the loaded model to make predictions
predictions = model.predict(patient_reshaped)

#print(predictions)

python_list = predictions.tolist()

# Convert the Python list to a valid JSON format
json_data = json.dumps(python_list)

# Output the JSON data
print(json_data)