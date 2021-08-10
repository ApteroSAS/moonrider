**Explanation of code**

1. # **Operation of the stateful system and api functions**

Moonrider uses the A-Frame framework and more specifically a stateful system. This state management for A-Frame consists in using a single global state modified by actions. The state of the application is a singleton defining an initial state as well as management functions allowing to modify this state. The initialization of the state as well as the management functions are defined in the ./src/state/index.js file. The initialization section is named initialState and the section including the management functions is named handlers. 

I made a file named functionsApi.js in which I created an object (in order to facilitate the export to use it in the sample). In this object, I defined various functions which will allow in particular to activate the functions of state management. This way, I could create buttons in HTML language (instead of entities) while keeping the functionality of the game.   

Let's take the example of the Begin button defined in the ./sample/index.html file:

When this button is clicked, it calls the start function defined in the previously mentioned object. This start function activates itself two management functions: startgame and menuopeningend. The drop-down lists of possible songs and difficulties are also filled in when the button is clicked. 
1. # **Functioning of the curve**

The curve entity is defined in the file ./sample/src/scenes.html and is composed of different components. In the component surpercurve (defined in the file ./src/components/supercurve.js), I modified the generateCurve function so that the curve remains straight. To do so, I removed the Math.random that was making the curve deviate (line 58 -59 in the original file):

prevPoint.x + (Math.random() \* X\_MAX\_DEVIATION \* 2 - X\_MAX\_DEVIATION),

prevPoint.y + (Math.random() \* Y\_MAX\_DEVIATION \* 2 - Y\_MAX\_DEVIATION),

The parameter in this function allows to choose the size of the curve. In the file ./src/components/beat-generator.js, the generateCurve function is called in order to generate a curve having a size coherent with the duration of the chosen music and the speed of play. 

In the file ./src/components/supercurve-shader.js : in schema, color1 and color2 indicates the colors of the lines (primary : red, secondary : blue) of the curve. To change the color, you have to change the default color. But it changes only the color on the home page but not during the game.

The color1 corresponds to the color of the left line, the middle line and the right line on the curve

The color2 corresponds to the color of the stroke in the middle left and the stroke in the middle right. 

To change the primary and secondary colors of the curve during the game you have to modify the setColor below (lines 11 to 23) in the file ./src/components/supercurve-color.js. 

`      `if (!evt.detail || evt.detail === 'off') {

`        `this.setColor('color1', 'primary');

`        `return;

`      `}

`      `this.setColor('color1', evt.detail);

`    `});

`    `el.sceneEl.addEventListener('curveoddstageeventcolor', evt => {

`      `if (!evt.detail || evt.detail === 'off') {

`        `this.setColor('color2', 'secondary');

`        `return;

`      `}

`      `this.setColor('color2', evt.detail);

The primary and secondary colors are defined in ./src/constants/colors.js according to the chosen theme. 
1. # **Functioning of beat generation** 

The beat generation is done in the file ./src/components/beat-generator.js and more particularly in the generateBeat function. In the tick part of this component, the for loop (lines 202 to 207) allows to generate the beats:

`    `for (let i = this.index.notes; i < notes.length; ++i) {

`     `if (songTime + BEAT\_FORWARD\_TIME > notes[i].\_time \* msPerBeat) {

`        `this.generateBeat(notes[i]);

`        `this.index.notes++;

`      `} 

`    `}

The if allows you to generate beats as the music progresses and not generate and therefore display all the beats at once. 

In the setupBeat function, the following three lines (lines 281 to 283) are used to define the position of the beat:

`  `const cutDirection = this.orientationsHumanized[noteInfo.\_cutDirection];

`    `const horizontalPosition = this.horizontalPositionsHumanized[noteInfo.\_lineIndex];

`    `const verticalPosition = this.verticalPositionsHumanized[noteInfo.\_lineLayer];

Each beat is positioned on the curve according to coordinates. The vertical position varies between the integers 0,1 and 2. These integers correspond respectively to the lowest position, the middle position, and the highest position. The horizontal position varies between the integers:

\- -2: located at the level of the line on the left

\- -1: located at the level of the line in the middle on the left

\- 0: located at the level of the line in the middle

\- 1: located at the level of the line in the middle on the right

\- 2: located at the level of the line on the right

Depending on the chosen game mode, two types of components are used for the beats. If the mode is ride mode then each beat will use the plume component and for other modes it will use the beat component.
1. # **Functioning of the player's movement** 

In the initial game, the player moves on the curve following the follow mechanism. However, in the modified version, we want the player to stay on the spot and the beats and the walls to come to him. So, I had to disable the player's movement while keeping the supercurve-follow component defined in the ./src/components/supercurve.js file. This component had to be kept because it allows to update the songProgress variable necessary to detect the destruction of the beats and the disappearance of the walls. 

The entity that simulates the player's progress is curveFollowRig since the camera follows this entity. To display the corresponding area under the player, you have to use the template stageFollow.html. 

Here are the modifications I had to do in the supercurve.js file to stop the movement of this zone while keeping the modification of the songProgress variable: 

\- I changed the first parameter of the getPointAt function call (line 306) to 0:

curve.getPointAt(0, this.el.object3D.position);

The function getPointAt modifies the position of the object this.el.object3D at the point of the curve corresponding to the percentage indicated (in first parameter). So by setting 0 as the first parameter the position of the object (corresponding here to the curveFollowRig entity) will always remain at the beginning of the curve.

- I also modified the line 308 like this:

supercurve.alignToCurve(0, this.el.object3D);

This aligns the area under the player in the right direction and therefore turns the camera in the right direction as well.

\- I have also commented out line 239 (in the alignToCurve function) :

`   `//object3D.position.y += 0.01;  // Z-fighting


1. # **Explanation of the move and move-reset components**

In order to make the beats and walls move towards the player, I created a move component. It has two properties defined in the schema: enabled (a boolean set to false by default) and speed. In the tick part, I calculate the real speed of the movement according to the speed property and I translate the object on Z equal to the real speed value. The Z-axis position increases as the beat (respectively the wall) moves towards the player. I put a condition before performing these two actions so that they are only performed if the enabled property is true.  

I also created a move-reset component that allows to reposition the BeatContainer and WallContainer entities to positions 0,0,0 when the cleargame event is activated. 

` `To use these components, I use the following lines in the entities I want to move, i.e. beatContainer and WallContainer:

`   `bind\_\_move="enabled: isPlaying; speed: speed"

`    `bind\_\_move-reset="isVictory: isVictory; enabled: isPlaying"

`    `move

By adding these lines to the entities I want to move, the enabled property of the move component corresponds to the value isPlaying and thus allows to move the entities only when the game is launched. The speed property corresponds to the value of the speed variable defined in the file ./src/state/index.js in the initialState part and which is 10. So, if we want to accelerate the speed of the game, we have to modify this variable. 

1. # **Position relative to the world** 

An important concept to understand is that there are two positions for objects in 3D: the position relative to the parent object and the position relative to the world. By moving the beats and walls towards the player, this notion came into play. Indeed, I had to make different modifications to compare the positions relative to the world and not those relative to the parents.  

Initially the position of the beats was compared to the position of the player in order to send them back to the pool when they passed the player. However, this comparison used the position relative to the parent object. 

Since I don't really have access to each beat and wall, I used the component move on the entities beatContainer and wallContainer which contain respectively the beats and the walls. So, the position of the beats relative to its parent object beatContainer is not really modified but the position relative to the world is. So, before the changes to use the position relative to the world, the beats never went back to the pool and kept moving behind the player. 

In the ./src/components/plume.js file corresponding to the beats in the case of the ride mode I made the following changes: 

- `  `I created two vectors called vectBeat and vectCurve in the init part 
- ` `I added these two lines in the tock part (lines 53 and 54): 

`  `this.el.object3D.getWorldPosition(this.vectBeat);

`  `this.curveFollowRig.object3D.getWorldPosition(this.vectCurve);

These lines allow to copy in the vectors the position relative to the world of the beat (first line) and of the zone corresponding to the player.

- I then modified the condition on line 55 to use the two vectors created previously to compare the position on the Z axis of the beat and the player's zone. 

` `if (this.vectBeat.z> this.vectCurve.z+2)

So the position of the beat exceeds the position of the player's zone incremented by 2 then the beat is returned to the pool and thus disappears. 

I made the same modifications in the ./src/components/beat.js file so that the beats of the other modes go back to the pool after having passed the player. So, I created two vectors and modified lines 358 to 360 like this: 

`    `this.el.object3D.getWorldPosition(this.vectBeat);

`    `this.curveFollowRig.object3D.getWorldPosition(this.vectCurve);

`    `if ((this.vectBeat.z - returnDistance) > this.vectCurve.z) {

`      `this.returnToPool();

`      `this.missHit();

`    `}

If a beat passes the player, it returns to the pool and is counted as missed.  
## **Effect beats cut:** 
In the beat.js file you have to replace the line in comment with the line above (line 468), this allows to get the effect depending on the position relative to the world.

`    `this.el.object3D.getWorldPosition(explodeEventDetail.position);

`    `//explodeEventDetail.position.copy(this.el.object3D.position);

