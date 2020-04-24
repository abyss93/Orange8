<p align="center">
<img src="/assets/githubLogo.png">
</p>

# Orange8
Chip8 è un linguaggio di programmazione interpretato inventato durante gli anni '70 affinchè i programmi con esso scritti potessero girare su vari microcomputers dell'epoca, di conseguenza i programmi scritti in Chip8 girano su una macchina virtuale appositamente creata. Negli anni successivi Chip8 è stato anche portato sui diversi calcolatori grafici.

### Software
Molto vario, da giochi come Pong, Space Invaders, Tetris e Pac-Man a generatori di labirinti e persino una implementazione del Game Of Life. Tutto il software scritto in Chip8 è liberamente reperibile online in quanto di pubblico dominio.

### Perché Orange8?
Il mondo dell'emulazione delle console da gioco mi ha sempre affascinato, il richiamo ad avvicinarmi nel tempo è sempre stato forte. Dopo tanti anni ho finalmente potuto implementare qualcosa che ci si avvicina e che anzi è indicato da tutti come il miglior entry point per il mondo dell'emulazione.
L'interprete è scritto in TypeScript.

###### Build ed utilizzo
L'emulatore deve essere buildato utilizzando *gulp*, al termine il bundle si troverà nella cartella */dist*. L'emulatore gira su browser aprendo la pagina *index.html*. I programmi devono essere scaricati a parte, ne deve essere poi fatto l'upload tramite l'apposito input.

_Di seguito alcuni screenshot dell'emulatore in esecuzione_
![scr1](/screenshots/scr1.png)
![scr2](/screenshots/scr2.png)
![scr3](/screenshots/scr3.png)

###### Riferimenti utili
* https://en.wikipedia.org/wiki/CHIP-8#Virtual_machine_description
* http://devernay.free.fr/hacks/chip8/C8TECH10.HTM
* http://mattmik.com/files/chip8/mastering/chip8.html
* http://laurencescotford.co.uk/?p=304
* http://www.multigesture.net/articles/how-to-write-an-emulator-chip-8-interpreter/

Ringrazio tutti gli autori di queste pagine, che in certi casi si sono rivelate indispensabili per la comprensione del set di istruzioni.
