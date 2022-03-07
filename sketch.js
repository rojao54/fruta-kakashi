//Estados do jogo
var JOGAR=1;
var ENCERRAR=0;
var estadoJogo=1;

var faca,fruit ,monstro,grupoFruta,grupoMonstro, placar,r,frutaAleatoria, posicao;
var imgFaca , fruta1, fruta2 ,fruta3,fruta4, imgMonstro, imgFimdeJogo, somdefaca;
var somgameover;

function preload(){
  
  imgFaca = loadImage("knife.png");
  imgMonstro = loadAnimation("alien1.png","alien2.png")
  fruta1 = loadImage("fruit1.png");
  fruta2 = loadImage("fruit2.png");
  fruta3 = loadImage("fruit3.png");
  fruta4 = loadImage("fruit4.png");
  imgFimdeJogo = loadImage("gameover.png")

  //som de carregamento aqui

  somdefaca = loadSound("knifeSwoosh.mp3")
  somgameover = loadSound("gameover.mp3")
  
}



function setup() {
  createCanvas(600, 600);
  
  //criando a faca
   faca=createSprite(40,200,20,20);
   faca.addImage(imgFaca);
   faca.scale=0.7
  
  //definir função collider para a faca
  faca.setCollider("rectangle",0,0,40,40);

  // Placar, variáveis e grupos
  placar=0;
  grupoFruta=createGroup();
  grupoMonstro=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(estadoJogo===JOGAR){
    
    //Chamar as funções frutas e Monstros
    frutas();
    Monstro();
    
    // Mover a faca com o mouse
    faca.y=World.mouseY;
    faca.x=World.mouseX;
  
    // Aumenta a pontuação se a faca tocar na fruta
    if(grupoFruta.isTouching(faca)){
      grupoFruta.destroyEach();
      somdefaca.play();
      placar=placar+2;
    }
    else
    {
      // Vá para o estado encerrar se a faca tocar o inimigo
      if(grupoMonstro.isTouching(faca)){
        estadoJogo=ENCERRAR;
        somgameover.play();
        
        //adicionar som de fim de jogo aqui
        
        grupoFruta.destroyEach();
        grupoMonstro.destroyEach();
        grupoFruta.setVelocityXEach(0);
        grupoMonstro.setVelocityXEach(0);
        
        // Mude a animação da espada para gameover e redefina sua posição
        faca.addImage(imgFimdeJogo);
        faca.scale=2;
        faca.x=300;
        faca.y=300;
      }
    }
  }
  
  drawSprites();
  //Exibe o placar
  textSize(25);
  text("Placar : "+ placar,250,50);
  
}


function Monstro(){ if(World.frameCount%200===0){ monstro=createSprite(400,200,20,20); monstro.addAnimation("moving", imgMonstro); monstro.y=Math.round(random(100,550)); monstro.velocityX=-(8+(placar/10)); monstro.setLifetime=50; grupoMonstro.add(monstro); } }

function frutas(){
  if(World.frameCount%80===0){
    posicao = Math.round(random(1,2));
    fruta=createSprite(400,200,20,20);
    
     //usando uma variável aleatória muda a posição da fruta, para torná-la mais desafiadora
    
    if(posicao==1)
    {
    fruta.x=600;
    //a atualização abaixo fornece a linha de código para aumentar a velocidade do grupoFruta em 4
    fruta.velocityX=-(7+ (placar/4))
      
      
      
    }
    else
    {
      if(posicao==2){
      fruta.x=0;
      
     // a atualização abaixo fornece a linha de código para aumentar a velocidade do grupoFruta em 4
      fruta.velocityX= 7+ (placar/4);
      }
    }
    
    fruta.scale=0.2;
     //fruta.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruta.addImage(fruta1);
    } else if (r == 2) {
      fruta.addImage(fruta2);
    } else if (r == 3) {
      fruta.addImage(fruta3);
    } else {
      fruta.addImage(fruta4);
    }
    
    fruta.y=Math.round(random(50,550));
   
    
    fruta.setLifetime=100;
    
    grupoFruta.add(fruta);
  }
}

