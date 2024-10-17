//
var BootState = {
    //
    init: function() {
        game.stage.backgroundColor = "#000000";
        game.input.maxPointers = 1;
        game.stage.disableVisibilityChange = false;

        if (!game.device.desktop) {
            //if(game.device.android && !game.device.chrome) game.canvas.parentElement.style.overflow = "visible";

            game.scale.forceOrientation(true, false);
            game.scale.enterIncorrectOrientation.add(this.onEnterIncorrectOrientation, this);
            game.scale.leaveIncorrectOrientation.add(this.onLeaveIncorrectOrientation, this);
        }

        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.setResizeCallback(this.gameResized, this);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.gameResized();
        game.scale.setScreenSize(true);

        SG_Hooks.setOrientationHandler(this.onEnterIncorrectOrientation);
        SG_Hooks.setResizeHandler(this.gameResized);

    },

    gameResized: function() {
        window.AutoScaler('gameContainer', 960, 634);
    },

    preload: function() {
        // game.load.image('logo', 'assets/logo_ingame.png');
    },

    //
    create: function() {
        game.state.add('load', LoadState);
        game.state.add('logo', LogoState);
        game.state.add('menu', MenuState);
        game.state.add('play', PlayState);
        game.state.start('load');
    },

    //
    onEnterIncorrectOrientation: function() {
        if (game.scale.incorrectOrientation) {
            document.getElementById('incorrect-orientation').style.display = 'block';
            document.body.style.marginBottom = "0px";
        }
    },

    //
    onLeaveIncorrectOrientation: function() {
        document.getElementById('incorrect-orientation').style.display = 'none';
    }
};