import numpy as np
import cv2
img=cv2.imread('tt.png')
px=img[500,500]

print(px)
print(img)
cv2.imshow('image',img)
cv2.waitKey(0)
cv2.destroyAllWindows()
