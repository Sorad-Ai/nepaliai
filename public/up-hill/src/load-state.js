//
var LoadState = {

    loadText: null,

    //
    init: function() {
        game.load.onLoadStart.add(this.loadStart, this);
        game.load.onFileComplete.add(this.fileComplete, this);
        game.load.onLoadComplete.add(this.loadComplete, this);
    },

    //
    create: function() {

        //  Load the Google WebFont Loader script
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        /*
        game.load.atlas('atlas_boom', 'assets/atlas_boom.png', 'assets/atlas_boom.json');
        game.load.json('strings', 'text/en.json');
        */

        //if(game.device.webAudio)
        //for(var i in sfx_res)
        //game.load.audio(sfx_res[i], ['assets/sfx/' + sfx_res[i] + '.mp3', 'assets/sfx/' + sfx_res[i] + '.ogg']);
        //

        game.load.atlas('atlas', 'assets/atlas.png', 'assets/atlas.json');
        game.load.atlas('gui', 'assets/gui.png', 'assets/gui.json');
        game.load.physics('physics', 'assets/physics.json');

        game.load.image('back1_and_back3', 'assets/back1_and_back3.png');
        game.load.image('back2', 'assets/back2.png');
        game.load.image('back4', 'assets/back4.png');
        game.load.image('back5', 'assets/back5.png');
        game.load.image('back6', 'assets/back6.png');
        game.load.image('back7', 'assets/back7.png');
        game.load.image('back8', 'assets/back8.png');

        game.load.json('data', 'assets/data.json');

        game.load.image('block.png', 'assets/block.png');
        game.load.image('main_menu_back.png', 'assets/main_menu_back.png');
        game.load.image('main_menu_front.png', 'assets/main_menu_front.png');
        game.load.image('menu_upgrades_new.png', 'assets/menu_upgrades_new.png');
        game.load.image('fon.png', 'assets/fon.png');

        game.load.json('strings', 'text/' + SG.lang /*SG_Hooks.getLanguage(['en'])*/ + '.json');

        // if(game.device.webAudio)
        // {
        // 	game.load.audio('music', ['assets/audio/Music.mp3']);
        // 	game.load.audio('engine', ['assets/audio/car__engine.mp3']);
        // 	game.load.audio('low_fuel', ['assets/audio/low_fuel.mp3']);
        // 	game.load.audio('coin', ['assets/audio/get_coins.mp3']);
        // 	game.load.audio('fuel', ['assets/audio/fuel_up.mp3']);
        // 	game.load.audio('level', ['assets/audio/lap_completed.mp3']);
        // 	game.load.audio('neck', ['assets/audio/neck_crush.mp3']);
        // 	game.load.audio('mushrom', ['assets/audio/BadMushroom.mp3']);
        // 	game.load.audio('button', ['assets/audio/button_press.mp3']);
        // 	game.load.audio('buy', ['assets/audio/buy.mp3']);
        // 	game.load.audio('impact', ['assets/audio/car_impact.mp3']);
        // 	game.load.audio('flag', ['assets/audio/flag_got.mp3']);
        // }

        game.load.crossOrigin = true;
        game.load.start();
    },
    //
    loadStart: function() {
        var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        logo.anchor.set(0.5);
        logo.inputEnabled = true;
        //logo.events.onInputDown.add(function() { window.open('http://m.softgames.de/', '_blank'); }, this);
        this.loadText = game.add.text(game.world.centerX, game.world.centerY + 140, '', style_label);
        this.loadText.anchor.setTo(0.5, 0.5);
    },

    //
    fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
        this.loadText.setText(progress + "%");
    },

    //
    loadComplete: function() {
        this.stage.disableVisibilityChange = false;

        if (game.device.localStorage) {
            //localStorage.removeItem('up_hill_racing_savedata');

            var saveData = localStorage.getItem('up_hill_racing_savedata');
            if (saveData) game.g_player = JSON.parse(saveData);
        }

        if (!game.g_player) {
            game.g_player = {
                'sound': true,
                'tut': true,
                'coins_ride': 0,
                'level': 0,
                'car': 0,
                'open_levels': [true, false, false, false, false, false, false, false],
                'records': [0, 0, 0, 0, 0, 0, 0, 0],
                'flags': [-1, -1, -1, -1, -1, -1, -1, -1],
                'open_cars': [true, false, false, false, false, false, false, false],
                'coins': 0,
                'levels_completed': 0,
                'upgrades': [{
                        "upgrades_susp": -1,
                        "upgrades_engine": -1,
                        "upgrades_tyre": -1,
                        "upgrades_fuel": -1,
                        "upgrades_spec": -1
                    },
                    {
                        "upgrades_susp": -1,
                        "upgrades_engine": -1,
                        "upgrades_tyre": -1,
                        "upgrades_fuel": -1,
                        "upgrades_spec": -1
                    },
                    {
                        "upgrades_susp": -1,
                        "upgrades_engine": -1,
                        "upgrades_tyre": -1,
                        "upgrades_fuel": -1,
                        "upgrades_spec": -1
                    },
                    {
                        "upgrades_susp": -1,
                        "upgrades_engine": -1,
                        "upgrades_tyre": -1,
                        "upgrades_fuel": -1,
                        "upgrades_spec": -1
                    },
                    {
                        "upgrades_susp": -1,
                        "upgrades_engine": -1,
                        "upgrades_tyre": -1,
                        "upgrades_fuel": -1,
                        "upgrades_spec": -1
                    },
                    {
                        "upgrades_susp": -1,
                        "upgrades_engine": -1,
                        "upgrades_tyre": -1,
                        "upgrades_fuel": -1,
                        "upgrades_spec": -1
                    },
                    {
                        "upgrades_susp": -1,
                        "upgrades_engine": -1,
                        "upgrades_tyre": -1,
                        "upgrades_fuel": -1,
                        "upgrades_spec": -1
                    },
                    {
                        "upgrades_susp": -1,
                        "upgrades_engine": -1,
                        "upgrades_tyre": -1,
                        "upgrades_fuel": -1,
                        "upgrades_spec": -1
                    }
                ]
            };
        }
        SG_Hooks.loaded();
        SG_Hooks.start();
        game.state.start('logo');
    }
};