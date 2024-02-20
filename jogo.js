//alocando as configurações básicas do game em uma variável config
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    //definindo as propriedades da cena única
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

//criando, de fato, o jogo com as propriedades definidas em config e armazenando-o em uma variável game
var game = new Phaser.Game(config);
//variável que será usada mais adiante para representar o sprite do passarinho
var bird;

//realizando o pré-carregamento da imagem de background e do spritesheet de passarinho
function preload () {
    this.load.image("bg", "assets/bg_space.png");
    /* aqui também é definido a largura e a altura com as quais os frames devem ser recortados, o que
    deixa a spritesheet exatamente com 8 frames */
    this.load.spritesheet("bird", "assets/bird-red.png", {frameWidth: 75, frameHeight: 75});
};
//adicionando a imagem e a spritesheet à página web
function create () {
    this.add.image(400, 300, "bg").setScale(1.2);
    //a variável bird é usada aqui para armazenar o sprite do passarinho
    bird = this.add.sprite(100, 150, "bird").setScale(1.3);
    //criando a animação do sprite
    this.anims.create({
        //"voando" é o nome pelo qual essa animação passa a ser chamada
        key: "voando",
        //definindo a taxa de quadros p/ segundo com a qual fluirá a animação
        frameRate: 10,
        /* apontando ao código em qual frame essa animação começa e em qual frame ela termina, nesse
        caso, serão usados todos os frames para a animação */
        frames: this.anims.generateFrameNumbers("bird", {start: 0, end: 7}),
        //o valor de repetição -1 define que a animação rodará em loop
        repeat: -1,
    });
    //roda a animação
    bird.anims.play("voando", true);
};
function update () {
    /* aqui, cria-se um sistema no qual, quando a posição do pássaro, no eixo horizontal, chega a 100
    pixels da borda esquerda da tela (ou já está posicionada lá), ele se vira para a direita e vai nessa 
    direção até chegar a 100 pixels da borda direita da tela */
    if (bird.x === 100) {
        bird.setFlip(false, false);
        /* note que, para isso, foi criada uma variável que aponta se o pássaro está indo para a esquerda
        ou não */
        going = true;
    };
    //o pássaro depende que essa variável seja verdadeira para ir para a direita
    if (bird.x < 700 && going === true) {
        bird.x += 5;
    };

    //aqui ele inverte o sentido e voa da esquerda para a direita até chegar a 100 pixels da borda
    if (bird.x === 700) {
        bird.setFlip(true, false);
        //note que a variável não é mais verdadeira, pois o pássaro não está mais indo para a esquerda
        going = false;
    };
    if (bird.x > 100 && going === false) {
        bird.x -= 5;
    };

    /* o mesmo sistema foi aplicado ao movimento vertical, com a diferença de que o passarinho não
    precisa inverter seu sentido verticalmente e de que uma nova variável foi criada para evitar
    conflitos */
    if (bird.y === 150) {
        up = true;
    };
    if (bird.y < 450 && up === true) {
        bird.y += 2;
    };
    if (bird.y === 450) {
        up = false;
    };
    if (bird.y > 150 && up === false) {
        bird.y -= 2;
    }; 


    /* houve a tentativa de recriar esse sistema baseado em estruturas de repetição while, no entanto,
    o pássaro se torna tão rápido que não é possível notar sua ida e volta. Para averiguar essa situação,
    basta executar o código abaixo, abrir o console do navegador e notar que ele imprime os valores como
    se o pássaro realmente estivesse voando pela tela, mas muito rápido */
    /* if (bird.x === 100) {
        while (bird.x < 700) {
            bird.setFlip(false, false);
            bird.x += 5;
            console.log(bird.x);
        };
    };
    if (bird.x === 700) {
        while (bird.x > 100) {
            bird.setFlip(true, false);
            bird.x -= 5;
            console.log(bird.x);
        };
    };
    if (bird.y === 150) {
        while (bird.y < 450) {
            bird.y += 2;
            console.log(bird.y);
        };
    };
    if (bird.y === 450) {
        while (bird.y > 150) {
            bird.y -= 5;
            console.log(bird.y);
        };
    }; */

};