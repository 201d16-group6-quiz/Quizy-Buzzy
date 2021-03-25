# Quizy-Buzzy coding standard 

## General

-	All File names should be in lowercase.
-	Always use descriptive names for variables, classes, functions …etc.

## JavaScript

### Naming and declaration rules for variables and functions.

-	we use camelCase for identifier names (variables and functions).
-	Use uppercase for constants.
-	Use the first letter in uppercase with objects (ex:` Car ={};`)
-	All names start with a letter.

### Rules for the use of white space, indentation, and comments.

General rules for complex (compound) statements:

-	Put the opening bracket at the end of the first line.
-	Use one space before the opening bracket.
-	Put the closing bracket on a new line, without leading spaces.
-	Do not end a complex statement with a semicolon.

```js
function toCelsius(fahrenheit) {
  return (5 / 9) * (fahrenheit - 32);
}
if (time < 20) {
  greeting = "Good day";
} else {
  greeting = "Good evening";
}

```
 
-	Use comments to describe each function in your code and whenever necessary, especially in loops and conditions.
-	Declarations on Top, it is a good coding practice to put all declarations at the top of each script or function.
-	eslint.json will have most of the standards so you must enable it.
-	Clean your code before pushing it, remove commented code lines, console logs and debugger and all non-related stuff to the final code.

## CSS

-	Always link reset.css.

### Selectors

-	use lowercase and separate words with hyphens when naming selectors. Avoid camelCase and underscores.
Ex:
```css
	 .images-section{
}
```
### Properties

-	Use hex code for colors, or rgba() if opacity is needed.
-	All properties and values should be lowercase.
-	Do not use the same name twice, for example you can not have a class and an id with the same name.

## HTML

-	Use  lowercase element names and Attribute names.
-	Always Specify alt, title, width, and height for Images.
-	You should always include the lang attribute inside the `<html>` tag.
-	Style must be written in separate CSS file.
-	Use semantic elements, avoid using div unless you need a container. 
-	Do not give everything a class, elements which are easily selected without classes and ids should not have them.

