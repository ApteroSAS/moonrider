**Documentation API** 

**start** : The start function allows to launch the beginning of the Moonrider game and thus to arrive at the step of choosing a music. It does not require any parameter. This function allows to activate the startgame and menuopeningend handler functions.

**genres** : The genre function allows the user to open the window to choose a genre of music to reduce the number of music proposals and thus to specify his search according to a particular genre. This function does not require any parameters and it allows to active the genremenuopen handler function. 

**clearGenre** : This function allows to delete the music genre selected by the user (thanks to the genre function) and to restore the music list. It does not require any parameter and activates the genreclear handler function.

**difficulties** : The difficulties function allows the user to select the difficulty of the music in order to reduce the list of proposed music (only the music with the selected difficulty will be proposed). This function does not require any parameter and activates the difficultyfiltermenuopen handler function. 

**options** : This function opens the window to change the game theme (background colors). It does not require any parameter and activates the optionsmenuopen handler functions.

**searchMusic** : The searchMusic function allows the user to access the music search menu. It does not require any parameter and activates the keyboardopen handler functions.

**playlistsChoice** : This function allows the user to access the playlist selection menu. The list of proposed music will be adapted according to the selected playlist. This function does not require any parameter and activates the playlistmenuopen handler function.

**clearPlaylist** : The clearPlaylist function allows to delete the previously selected playlist (thanks to the function playlistChoice). This function does not require any parameter and activates the playlistclear handler function.

**back** : The back function allows to leave a selection menu (Playlists, Genres, Difficulties, Themes and Search). It does not require any parameter and activates the menuback handler function.

**addList** : This function allows you to add an item to a list (here dropdown list). It needs 2 parameters : the identifier of the dropdown list and the item you want to add.

**listSongs** : The listSongs function allows to get the list of songs that it adds to the dropdown list (thanks to the addList function). This list is adapted according to the different selections (Playlists, Genres, Difficulties, Themes and Search) made by the user. It requires to have the identifier of the drop-down list in which the music will be stored. To retrieve the information of each music, the function uses the results array stored in AFRAME.scenes[0].systems.state.state.search. The information of each music added to the drop-down list are songSubName, songName and the identifier. If songSubName is "Unknown Artist" instead of displaying this information, the author will be displayed.

**getIdMusic** : this function allows you to retrieve/return the identifier of the music selected in the music drop-down list. It requires as parameter the identifier of the music drop-down list.

**getDifficultiesTab** : This function allows to get/return the table containing the different possible difficulties of a music. It requires as parameter the music identifier.

**listDifficulties** : This function allows to fill the difficulty list. It needs to have 2 parameters : the identifier of the music drop-down list and the identifier of the difficulty drop-down list. It retrieves the difficulty table returned by the getDifficulties function by indicating as parameter the identifier of the music selected in the music drop-down list (thanks to getIdMusic function). Once the difficulty table of the music is retrieved, this function uses addList to add each difficulty to the corresponding dropdown list. 

To update the difficulty dropdown list, I use a listener on the 'change' event on the music dropdown list. This will allow that as soon as we change the selected music, the listDifficulties function is called to update the second dropdown list. 

**getDifficulty** : This function retrieves the difficulty selected in the difficulty drop-down list. It uses as parameter the identifier of the difficulty drop-down list.

**getSrcImage** : This function returns the source link of the image corresponding to the music whose ID is given in parameter.

**selectMusic** : This function allows you to select a music by activating the menuchallengeselect handler function. It requires as parameter the identifier of the music you want to select.

**selectDifficulty** : This function allows you to change the difficulty of the music by activating the menudifficultyselect handler function.

**play** : The play function allows to launch the game (launch the music and the beats). It requires as parameter the identifier of the chosen music. It requires to have selected a music before (call the selectMusic function and if a difficulty has been chosen you must also call the function selectDifficulty). It activates the playbuttonclick handler function.

**playMusic** : This function gathers the functions defined previously. It allows to launch a game by using the drop-down lists. It will get the ID and the difficulty of the selected music respectively via the functions getIdMusic and getDifficulty. The playMusic function then calls the selectMusic function (with the music ID as parameter) and selectDifficulty (with the difficulty as parameter), and finally the play function (with the music ID as parameter). WARNING : the order of the calls of the 3 functions is important ! 

**pause** : This function pauses the game and does not require any parameters. It activates the pausegame handler function.

**resume** : This function allows to resume a game when it has been previously paused (thanks to the pause function). It does not require any parameter and emits the gamemenuresume  event.

**restart** : This function allows to restart a game. It can be used at different times : when the game has been paused or at the end of a game. It does not require any parameter and emits the gamemenurestart and cleargame events

**exit** : This function allows to leave a game and to return to the main menu. It can be called at different stages of the game: just after the game has been paused or at the end of a game. It does not require any parameters and emits the gamemenuexit and cleargame events. 


note: 

Toutes les fonctions ci-dessus ont été mis dans un objet afin de pouvoir les exporter facilement et les utiliser via l’api. J’ai donc crée un objet nommé **obj** dans le fichier **./src/state/test.js** que j’ai exporté. Dans le fichier **./src/index.js** j’ai importé le fichier test et j’ai récupéré l’objet exporté et je l’ai stocké dans une variable nommée **objet\_api**. Les fonctions stockées dans cet objet sont donc accessibles via ce dernier. 

All the above functions have been put in an object in order to be able to export them easily and use them via the api. So I created an object named **obj** in the file **./src/state/functionsApi.js** that I exported. In the file **./src/index.js** I imported the functionsApi file and I retrieved the exported object and I stored it in a variable named **objet\_api**. The functions stored in this object are accessible via the latter. 
