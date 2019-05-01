import numpy
import cv2
img=cv2.imread('tt.png')
print(img)
cv2.imshow('image',img)
cv2.waitKey(0)
cv2.destroyAllWindows()
cv2.imwrite('tt_copy.jpg',img)