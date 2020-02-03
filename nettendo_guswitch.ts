//% weight=100 color=#00BBCC icon="\uF2DB" block="NG"
namespace nettendo_guswitch {

    export enum NGButton {
        Up,
        Down,
        Left,
        Right,
    }

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

    //% blockId="ng_ispressed" block="button %button|is pressed"
    //% button.fieldEditor="gridpicker" button.fieldOptions.columns=3
    export function buttonIsPressed(button: NGButtonPin): boolean {
        const pin = <DigitalPin><number>button;
        pins.setPull(pin, PinPullMode.PullUp);
        return pins.digitalReadPin(pin) == 0;
    }
}
