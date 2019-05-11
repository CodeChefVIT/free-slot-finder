import  cv2
import numpy as np
from PIL import Image
from PIL import ImageEnhance
img=cv2.imread('tt.png')
hsv = cv2.cvtColor(img,cv2.COLOR_BGR2HSV)

lgreen = np.array([25,0,0])
ugreen = np.array([30,255,255])
mask=cv2.inRange(hsv,lgreen,ugreen)
res=cv2.bitwise_and(img,img,mask=mask)
cv2.imshow('Masing',mask)
cv2.imshow('Original_Image',img)
cv2.imshow('Only_green_color',res)
cv2.imwrite('theory_copy.png',mask)
image = Image.open('theory_copy.png')
enhancer = ImageEnhance.Sharpness(image)
enhancer.enhance(5).save('tt.png')
cv2.waitKey(0)
cv2.destroyAllWindows()

