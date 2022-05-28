import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor() {
    this.config = {
      type: Phaser.AUTO,
      height: 600,
      width: 600,
      scene: [MainScene],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          debug: true,

        }
      }
    }
  }

  ngOnInit(): void {
    this.phaserGame = new Phaser.Game(this.config);
  }

}

class MainScene extends Phaser.Scene {
  monkey: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor() {
    super({
      key: 'main'
    });
  }


  override update(time: number, delta: number) {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.up.isDown) {
      this.monkey.setVelocityY(-300);
    } else if (cursors.down.isDown) {
      this.monkey.setVelocityY(300);
    } else {
      this.monkey.setVelocityY(0);
    }
  }

  preload() {
    this.load.image('ground', 'assets/ground.png');
    this.load.image('wall', 'assets/wall.png');
    this.load.image('ball', 'assets/ball.png');
    this.load.image('monkey', 'assets/monkey.png');
  }

  create() {
    this.add.image(300, 300, 'ground');

    const staticWalls = this.physics.add.staticGroup();
    staticWalls.create(0, 0, 'wall').setScale(.2).refreshBody();
    staticWalls.create(600, 0, 'wall').setScale(.2).refreshBody();
    staticWalls.create(0, 600, 'wall').setScale(.2).refreshBody();
    staticWalls.create(600, 600, 'wall').setScale(.2).refreshBody();

    const ball = this.physics.add.sprite(600, 300, 'ball')
      .setScale(0.2)
      .refreshBody()
      .setBounce(.5)
      .setVelocityX(300)
      .setCollideWorldBounds(true);

    this.physics.add.collider(staticWalls, ball);

    this.monkey = this.physics.add.sprite(25, 300, 'monkey')
      .setScale(0.2)
      .setRotation(50);

    this.physics.add.collider(staticWalls, this.monkey);
    this.physics.add.collider(ball, this.monkey);



  }


}
