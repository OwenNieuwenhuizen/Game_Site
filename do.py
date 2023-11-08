import turtle
turtle.bgcolor('black')
t=turtle.Turtle()
colors = ['red','dark red']
turtle.speed(10)
for number in range(400) :
    t.forward(number+1)
    t.right(89)
    t.pencolor(colors[number%2])
turtle.done()