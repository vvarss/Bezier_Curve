# 🪢Bezier_Curve
## ➕What is a Bezier Curve?
Bezier Curve is a mathematical curve , which is defined by control points to shape its path.

## ⭕Implementation of Bezier Curve
We use four control points to implement the bezier curve.
```
B(t) = (1−t)³P₀ + 3(1−t)²tP₁ + 3(1−t)t²P₂ + t³P₃
```

* We are having four points P0,P1,P2,P3
* We are taking P0,P3 as fixed points.
* P1,P2 as dynamic points.
* We add in a spring-damping model for smooth motion.
```
acceleration = -k * (position - target) - damping * velocity
```
## ⭕Tangent Vectors
* We take a derivative of the bezier curve equation.
```
B'(t) = 3(1−t)²(P₁−P₀) + 6(1−t)t(P₂−P₁) + 3t²(P₃−P₂)
```

## 🧩Interaction
* Move your mouse anywhere on the canvas:
* Inner control points follow the mouse with a soft spring effect
* The curve bends smoothly like a flexible rope
* Optional tangent vector shows direction of the curve at a specific point
  
## ✨Output

https://github.com/user-attachments/assets/3edfce80-fe77-4414-9724-46d0953ae6d1


