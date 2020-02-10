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

    //% block="on button %button pressed"
    //% button.fieldEditor="gridpicker" button.fieldOptions.columns=3
    export function onButtonPressed(button: NGButtonPin, handler: () => void) {
        const pin = <DigitalPin><number>button;
        pins.setPull(pin, PinPullMode.PullUp);
        pins.setEvents(pin, PinEventType.Edge);
        if (button == NGButtonPin.Up) {
            control.onEvent(
                control.eventSourceId(EventBusSource.MICROBIT_ID_IO_P1),
                control.eventValueId(EventBusValue.MICROBIT_BUTTON_EVT_CLICK),
                handler
            );
        } else if (button == NGButtonPin.Right) {
            control.onEvent(
                control.eventSourceId(EventBusSource.MICROBIT_ID_IO_P2),
                control.eventValueId(EventBusValue.MICROBIT_BUTTON_EVT_CLICK),
                handler
            );
        } else if (button == NGButtonPin.Down) {
            control.onEvent(
                control.eventSourceId(EventBusSource.MICROBIT_ID_IO_P8),
                control.eventValueId(EventBusValue.MICROBIT_BUTTON_EVT_CLICK),
                handler
            );
        } else if (button == NGButtonPin.Left) {
            control.onEvent(
                control.eventSourceId(EventBusSource.MICROBIT_ID_IO_P16),
                control.eventValueId(EventBusValue.MICROBIT_BUTTON_EVT_CLICK),
                handler
            );
        } else if (button == NGButtonPin.A) {
            control.onEvent(
                control.eventSourceId(EventBusSource.MICROBIT_ID_IO_P5),
                control.eventValueId(EventBusValue.MICROBIT_BUTTON_EVT_CLICK),
                handler
            );
        } else if (button == NGButtonPin.B) {
            control.onEvent(
                control.eventSourceId(EventBusSource.MICROBIT_ID_IO_P11),
                control.eventValueId(EventBusValue.MICROBIT_BUTTON_EVT_CLICK),
                handler
            );
        }
    }

    let strip: neopixel.Strip = neopixel.create(DigitalPin.P12, 5, NeoPixelMode.RGB);

    //% block
    export function neopixels(): neopixel.Strip {
        return strip;
    }

    let started: boolean = false;
    let hard: boolean = false;

    //% block
    export function startWithIcon(icon: IconNames) {
        strip.clear();
        strip.show();

        radio.setGroup(23);
        radio.sendNumber(0);

        input.onGesture(Gesture.Shake, function () {
            control.reset();
        })

        kermis.onKermisNotePlayed(function () {
            strip.rotate(1);
            strip.show();
        })

        basic.showIcon(icon);
        while (true) {
            if (input.buttonIsPressed(Button.A)) {
                hard = false;
                break;
            } else if (input.buttonIsPressed(Button.B)) {
                hard = true;
                break;
            }
        }
        basic.clearScreen();
        basic.pause(1000);
        started = true;
    }

    //% block
    export function hasStarted(): boolean {
        return started;
    }

    //% block
    export function hardWasChosen(): boolean {
        return hard;
    }

    //% block
    export function incrementScore() {
        game.addScore(1);
        radio.sendNumber(game.score());
        if (game.score() == 10) {
            // woohoo!
            game.pause(); // pause rendering engine
            input.onButtonPressed(Button.A, function () {
                strip.showRainbow(1, 360);
                kermis.playFirstPartOfKermisChorus();
                strip.showColor(neopixel.colors(NeoPixelColors.Black));
                strip.show();
            })
            input.onButtonPressed(Button.B, function () {
                strip.showRainbow(1, 360);
                kermis.playSecondPartOfKermisChorus();
                strip.showColor(neopixel.colors(NeoPixelColors.Black));
                strip.show();
            })
            basic.clearScreen();
            let count = 0;
            while (true) {
                count += 1;
                if (count % 2 == 0) {
                    basic.showIcon(IconNames.SmallHeart);
                } else {
                    basic.showIcon(IconNames.Heart);
                }
                basic.pause(100);
            }
        }
    }

    //% block
    export function gameOver() {
        game.gameOver();
    }
}
