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

    //% block
    export function startNettendoGuswitch() {
        basic.clearScreen();

        music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once);
        basic.showIcon(IconNames.Heart);
        basic.pause(500);

        strip.showColor(neopixel.colors(NeoPixelColors.Black));
        strip.show();
    }

}
