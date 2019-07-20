import io
import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="apikey.json"
# Imports the Google Cloud client library

from google.cloud import vision
from google.cloud.vision import types

# Instantiates a client
client = vision.ImageAnnotatorClient()

# The name of the image file to annotate
file_name = os.path.join(
    os.path.dirname(__file__),
    'time.png')

# Loads the image into memory
with io.open(file_name, 'rb') as image_file:
    content = image_file.read()

image = types.Image(content=content)

file1 = open("myfile.txt","w") 
    
    
def detect_text(path):
    """Detects text in the file."""
    from google.cloud import vision
    client = vision.ImageAnnotatorClient()

    # [START vision_python_migration_text_detection]
    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.types.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations
    print('Texts:')
    x=len(texts) 
    count=0
    for text in texts:
        count=count+1
        if count==x/2:
            break
            
        file1.write('\n{}'.format(text.description)) 
       # print('\n{}'.format(text.description))

        #vertices = (['({},{})'.format(vertex.x, vertex.y)
                   #for vertex in text.bounding_poly.vertices])

        #print('bounds: {}'.format(','.join(vertices)))
        
detect_text('time.png')