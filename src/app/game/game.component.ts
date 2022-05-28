import { Component, OnInit } from '@angular/core';

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
          gravity: {
            y: 100
          }
        }
      }
    }
  }

  ngOnInit(): void {
    this.phaserGame = new Phaser.Game(this.config);
  }

}

class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'main'
    });
  }


  override update(time: number, delta: number) {
    super.update(time, delta);
  }


}
