# Moon Rider

## Development

To modify this code, you need to have Node (< v12, recommended v11) and npm installed

Install and launch the game 

- Move the sample folder outside the moonrider-master folder
- From the moonrider-master folder:
  - run ``npm install``
  - run ``npm build``
- Open the package.json file of the sample folder and replace the relative path of the moonrider-master folder to the sample folder at line 61 

"moonriderlib": "file: ../moonrider-master",

In this example, the two folders sample and moonrider-master are in the same parent folder.   

- From the sample folder: 
  - Run ``npm install ``
  - Run ``npm run start``
- Then head to `localhost:3000` in your browser.

### Remixing and Forking

Each time a file in the moonrider-master folder is modified, it must be recompiled with the npm run build command from the moonrider-master folder. 

Each time the configuration of the moonrider library is modified (i.e. modification of the webpack.config.js file in moonrider-master), you have to reinstall the library using the npm i command in the sample folder.

Make this game your own! Some easy ways to mess around:

- To modify or add more color palettes, change `moonrider-master/src/constants/colors.js`.
- To change images, replace images in `sample/assets/img/` folder. For example,
  replace the moon at `src/assets/img/moon.png'.
- To change models, replace models in `sample/assets/models/` folder. For example,
  replace the arrow blocks at `sample/assets/models/arrowblue.obj` or
  `arrowred.obj`.
- To change sounds, replace sounds in `sample/assets/sounds`. 
- Change various values such as `speed` in `moonrider-master/src/state/index.js` or
  `BEAT_PRELOAD_TIME` in `moonrider-master/src/components/beat-generator.js` to mess with how
  fast you travel along the curve, or how much reaction time until the notes
  arrive to the player.

Other ways such as adding more modes are more involved, but with knowledge of
A-Frame and JavaScript, is doable!

### Test URL Parameters

| URL Parameter                           | Description                                                   |
|-----------------------------------------|---------------------------------------------------------------|
| ?debugcontroller={classic, punch, ride} | Show controllers and move them with shift/ctrl + {h, j, k, l} |
| ?debugbeatpositioning={classic, punch}  | Show all notes in possible positionings.                      |
| ?debugstate=victory          | Show victory screen.                               |

## How the example works

- Click on the Begin button
- Choose the game mode you want:
  - Ride Mode - Just sit back and enjoy the ride.
  - Punch Mode - Crush the stars.
  - Viewer Mode - Watch the beatmap within your browser.
  - Classic Mode - Surf and slice along the musical road.
- Choose the song from the first drop-down list
- Choose a difficulty in the second drop-down list
- Start the game by pressing Play
- To pause the game, press the Pause button 
- When the game is paused you can either continue the game by pressing the Resume button or start again by pressing Restart or exit the game with the exit button.  

