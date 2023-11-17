import turtle
turtle.bgcolor('grey')
t=turtle.Turtle()
colorR = ['red','dark red']
colorB = ['blue','dark blue']
colorG = ['green','dark green']
colors = [colorR]
turtle.speed(10)
for color in colors:
    for number in range(400) :
        t.forward(number+1)
        t.right(89)
        t.pencolor(color[number%2])
    t.penup
    t.forward(100)
    t.left(90)
    t.forward(100)
    t.pendown
turtle.done()