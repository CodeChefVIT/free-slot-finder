from PIL import Image
im = Image.open("uploads\tt.png")
def temp(f, t): 
	return int((abs(f[0]-t[0])**2 + abs(f[1]-t[1])**2 + abs(f[2]-t[2]))**0.5)
d = im.size #size ka tupple hai yeah 
out = Image.new('RGB', d, (255,255,255))

#k[0] red k[1] green k[2] blue
for i in range(d[0]):
	for j in range(d[1]):
		k = im.getpixel((i,j))
		if k[0]==60 and k[1]==141 and k[2]==188:
			out.putpixel((i,j), (255,255,0))# to make yellow
		elif k[1] > 200 and k[2] > 200 and k[2] >= k[1]: 
			out.putpixel((i,j), (255,255,0))# make lunch break wala yellow
		else: 
			dg = temp((203,254,51), k) #for the exact shade of green filled slot
			dy = temp((255,255,204), k) #for the exact shade of light yellow
			if dg < dy:
				out.putpixel((i,j), (0,0,0))# for the normal maximum green
			else:
				out.putpixel((i,j), (255,255,0))# for the normal maximum yellow
out.save("time.png")
#out.rotate(180).save("timetable.png")