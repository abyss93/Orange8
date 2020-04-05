# chip8

Chip8 è un linguaggio di programmazione interpretato inventato durante gli anni '70 affinchè i programmi con esso scritti potessero girare su vari microcomputers dell'epoca, di conseguenza i programmi scritti in Chip8 girano su una macchina virtuale appositamente creata. Negli anni successivi Chip8 è stato anche portato sui diversi calcolatori grafici.

# Software a disposizione
Molto vario, da giochi come Pong, Space Invaders, Tetris e Pac-Man a generatori di labirinti e persino una implementazione del Game Of Life. Tutto il software scritto in Chip8 è liberamente reperibile online in quanto di pubblico dominio.

# Perchè chip8?
Il mondo dell'emulazione delle console da gioco mi ha sempre affascinato, il richiamo ad avvicinarmi nel tempo è sempre stato forte. Dopo tanti anni (e dopo aver finalmente acquisito le competenze) ho finalmente potuto implementare qualcosa che ci si avvicina e che anzi è indicato da tutti come il miglior entry point per il mondo dell'emulazione.

# Considerazioni
Il lavoro è stato molto istruttivo, ritornano in mente vari concetti di reti logiche e architettura dei calcolatori. L'istruzione che disegna a schermo sfrutta alcune logiche di aritmetica modulare.
In generale è un assaggio dell'informatica di ieri ma con concetti utili per quella di oggi.

Non riporto alcun riferimento tecnico sull'architettura del Chip8 originario, in quanto argomento ampiamente trattato nei link che ho inserito nell'ultima sezione.

L'interprete è scritto in TypeScript.



# Riferimenti utili
[1] https://en.wikipedia.org/wiki/CHIP-8#Virtual_machine_description
[2] http://devernay.free.fr/hacks/chip8/C8TECH10.HTM
[3] http://mattmik.com/files/chip8/mastering/chip8.html
[4] http://laurencescotford.co.uk/?p=304
[5] http://www.multigesture.net/articles/how-to-write-an-emulator-chip-8-interpreter/

Ringrazio tutti gli autori di queste pagine, che in certi casi si sono rivelate indispensabili per capire "cosa dovevano fare" certe istruzioni del processore virtuale.
