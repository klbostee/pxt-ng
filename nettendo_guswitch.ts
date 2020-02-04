//% weight=100 color=#00BBCC icon="\uF2DB" block="NG"
namespace ng {

    export enum NGButtonPin {
        //% block="Up (P1)"
        Up = DAL.MICROBIT_ID_IO_P1,
        //% block="Right (P2)"
        Right = DAL.MICROBIT_ID_IO_P2,
        //% block="Down (P8)"
        Down = DAL.MICROBIT_ID_IO_P8,
        //% block="Left (P16)"
        Left = DAL.MICROBIT_ID_IO_P16,
        //% block="A (P5)"
        A = DAL.MICROBIT_ID_IO_P5,
        //% block="B (P11)"
        B = DAL.MICROBIT_ID_IO_P11,
    }

    //% blockId="ng_ispressed" block="button %button is pressed"
    //% button.fieldEditor="gridpicker" button.fieldOptions.columns=3
    export function buttonIsPressed(button: NGButtonPin): boolean {
        const pin = <DigitalPin><number>button;
        pins.setPull(pin, PinPullMode.PullUp);
        return pins.digitalReadPin(pin) == 0;
    }

    let buttonUpHandler: () => void = null;
    let buttonRightHandler: () => void = null;
    let buttonDownHandler: () => void = null;
    let buttonLeftHandler: () => void = null;
    let buttonAHandler: () => void = null;
    let buttonBHandler: () => void = null;

    //% block="on button %button pressed"
    //% button.fieldEditor="gridpicker" button.fieldOptions.columns=3
    export function onButtonPressed(button: NGButtonPin, handler: () => void) {
        if (button == NGButtonPin.Up) {
            buttonUpHandler = handler;
        } else if (button == NGButtonPin.Right) {
            buttonRightHandler = handler;
        } else if (button == NGButtonPin.Down) {
            buttonDownHandler = handler;
        } else if (button == NGButtonPin.Left) {
            buttonLeftHandler = handler;
        } else if (button == NGButtonPin.A) {
            buttonAHandler = handler;
        } else if (button == NGButtonPin.B) {
            buttonBHandler = handler;
        }
    }

    let strip: neopixel.Strip = neopixel.create(DigitalPin.P12, 5, NeoPixelMode.RGB);

    //% block
    export function neopixels(): neopixel.Strip {
        return strip;
    }

    //% block
    export function startNettendoGuswitch() {
        basic.clearScreen();

        music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once);
        basic.showIcon(IconNames.Heart);
        basic.pause(500);
        
        strip.showColor(neopixel.colors(NeoPixelColors.Black));
        strip.show();
        
        basic.forever(function () {
            if (buttonIsPressed(NGButtonPin.Up) && buttonUpHandler != null) {
                buttonUpHandler();
            }
            if (buttonIsPressed(NGButtonPin.Right) && buttonRightHandler != null) {
                buttonRightHandler();
            }
            if (buttonIsPressed(NGButtonPin.Down) && buttonDownHandler != null) {
                buttonDownHandler();
            }
            if (buttonIsPressed(NGButtonPin.Left) && buttonLeftHandler != null) {
                buttonLeftHandler();
            }
            if (buttonIsPressed(NGButtonPin.A) && buttonAHandler != null) {
                buttonAHandler();
            }
            if (buttonIsPressed(NGButtonPin.B) && buttonBHandler != null) {
                buttonBHandler();
            }
            basic.clearScreen()
        });
    }

}
