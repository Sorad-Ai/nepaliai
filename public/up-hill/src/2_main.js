//
/*window.onload*/
init = function() {
    setTimeout("window.scrollTo(0, 1)", 10);
    game = new Phaser.Game(960, 634, Phaser.AUTO, 'gameContainer', BootState);
    WebFontConfig = {

        //  'active' means all requested fonts have finished loading
        //  We set a 1 second delay before calling 'createText'.
        //  For some reason if we don't the browser cannot render the text the first time it's created.
        active: function() {
            game.time.events.add(Phaser.Timer.SECOND, createText, this);
        },

        //  The Google Fonts we want to load (specify as many as you like in the array)
        google: {
            families: ['Bowlby One SC', 'Russo One']
        }
    }
    styleLabelNoRus = {
        font: 20 + "px Bowlby One SC",
        fill: "#ffffff",
        align: "center"
    };
    styleLabelRus = {
        font: 22 + "px Russo One",
        fill: "#ffffff",
        align: "center"
    };

    SG.lang == "ru" ? style_label = styleLabelRus : style_label = styleLabelNoRus
}

function createText(x, y, text, style) {
    return game.add.text(x, y, text, style);
}

//
window.onunload = function() {

}

//
window.AutoScaler = function(element, initialWidth, initialHeight, skewAllowance) {
    var self = this;

    this.viewportWidth = 0;
    this.viewportHeight = 0;

    if (typeof element === "string") element = document.getElementById(element);

    this.element = element;
    this.gameAspect = initialWidth / initialHeight;
    this.skewAllowance = skewAllowance || 0;

    // Ensure our element is going to behave:
    self.element.style.display = 'block';
    self.element.style.margin = '0';
    self.element.style.padding = '0';

    if (window.innerWidth == self.viewportWidth && window.innerHeight == self.viewportHeight) return;

    var w = window.innerWidth;
    var h = window.innerHeight;

    var windowAspect = w / h;
    var targetW = 0;
    var targetH = 0;

    targetW = w;
    targetH = h;

    if (Math.abs(windowAspect - self.gameAspect) > self.skewAllowance) {
        if (windowAspect < self.gameAspect) targetH = w / self.gameAspect;
        else targetW = h * self.gameAspect;
    }

    self.element.style.width = targetW + "px";
    self.element.style.height = targetH + "px";

    self.element.style.marginLeft = ((w - targetW) / 2) + "px";
    self.element.style.marginTop = ((h - targetH) / 2) + "px";

    self.viewportWidth = w;
    self.viewportHeight = h;
};