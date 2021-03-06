enum Animation {
    Welcome,
    DeviceName,
    Lines,
    FillHorizontal,
    FillVertical,
    BarHorizontal,
    BarVertical
}
/**
* Some utilities
*/
//% weight=100 color=#ff9900 icon="\uf12e" block="Utilities"
//% advanced=true
namespace utilities {
    export class rgbLed {
        red: AnalogPin
        green: AnalogPin
        blue: AnalogPin
        constructor(r: AnalogPin, g: AnalogPin, b: AnalogPin) {
            this.red = r
            this.green = g
            this.blue = b
        }
        SetClolor(r: number, g: number, b: number) {
            if (r >= 0 && r < 256) pins.analogWritePin(this.red, r)
            if (r >= 0 && r < 256) pins.analogWritePin(this.green, g)
            if (r >= 0 && r < 256) pins.analogWritePin(this.blue, b)
        }
    }
    /**
     * Draws a little boot animation
     */
    //% block
    export function bootAnimation(anim: Animation): void {
        led.enable(true)
        if (anim == Animation.Welcome) {
            basic.showString("W")
            basic.showString("e")
            basic.showString("l")
            basic.showString("c")
            basic.showString("o")
            basic.showString("m")
            basic.showString("e")
            basic.showString("!")
        } else if (anim == Animation.DeviceName) {
            let str = control.deviceName()
            for (let i = 0; i < str.length; i++) {
                basic.showString(str[i])
            }
        } else if (anim == Animation.Lines) {
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    led.plotBrightness(j, i, 128)
                    basic.pause(75)
                    led.plot(j, i)
                    basic.pause(50)
                }
            }
        } else if (anim == Animation.FillHorizontal) {
            for (let i = 0; i < 5; i++) {
                for (let k = 1; k < 256; k++) {
                    for (let j = 0; j < 5; j++) {
                        led.plotBrightness(j, 4 - i, k)
                    }
                    basic.pause(10 - i * 2)
                }
                basic.pause(1 / Math.pow(2, i) * 250)
            }
        } else if (anim == Animation.FillVertical) {
            for (let i = 0; i < 5; i++) {
                for (let k = 1; k < 256; k++) {
                    for (let j = 0; j < 5; j++) {
                        led.plotBrightness(i, j, k)
                    }
                    basic.pause(10 - i * 2)
                }
                basic.pause(1 / Math.pow(2, i) * 250)
            }
        } else if (anim == Animation.BarHorizontal) {
            for (let i = 0; i < 5; i++) {
                for (let j = 1; j < 256; j++) {
                    led.plotBrightness(i, 3, j)
                    led.plotBrightness(i, 4, j)
                    basic.pause(10 - i * 2)
                }
            }
        } else if (anim == Animation.BarVertical) {
            for (let i = 0; i < 5; i++) {
                for (let j = 1; j < 256; j++) {
                    led.plotBrightness(0, i, j)
                    led.plotBrightness(1, i, j)
                    basic.pause(10 - i * 2)
                }
            }
        }
        basic.pause(750)
        basic.clearScreen()
    }
    /**
     * Returns true if the parameter string only contains numbers
     */
    //% block
    export function isNumber(s: string): boolean {
        const n = "0123456789"
        for (let i = 0; i < s.length; i++) {
            let b = false
            for (let j = 0; j < n.length; j++) {
                if (s[i] == n[j]) b = true
            }
            if (!b) return false
        }
        return true
    }
    /**
     * Represents the temperature on a 0-14 scale
     * (useful for smaller bars or indicators)
     */
    //% block
    export function temperatureScale() {
        let temp = input.temperature() - 1
        let num = 0
        if (temp <= -1)
            num = 0
        else if (temp <= 5)
            num = 1
        else if (temp <= 9)
            num = 2
        else if (temp <= 12)
            num = 3
        else if (temp <= 15)
            num = 4
        else if (temp <= 18)
            num = 5
        else if (temp <= 20)
            num = 6
        else if (temp <= 22)
            num = 7
        else if (temp <= 24)
            num = 8
        else if (temp <= 27)
            num = 9
        else if (temp <= 30)
            num = 10
        else if (temp <= 35)
            num = 11
        else if (temp <= 40)
            num = 12
        else if (temp <= 45)
            num = 13
        else
            num = 14
        return num
    }
    /**
     * Returns the direction that the Micro:bit's faced
     * e.g. North, North-East, ...
     */
    //% block
    export function compassDirection(): string {
        let heading = input.compassHeading()
        let str = ""
        if (heading >= 337.5 || heading < 22.5)
            str = "North"
        else if (heading >= 22.5 && heading < 67.5)
            str = "North-East"
        else if (heading >= 67.5 && heading < 112.5)
            str = "East"
        else if (heading >= 112.5 && heading < 157.5)
            str = "South-East"
        else if (heading >= 157.5 && heading < 202.5)
            str = "South"
        else if (heading >= 202.5 && heading < 247.5)
            str = "South-West"
        else if (heading >= 247.5 && heading < 292.5)
            str = "West"
        else if (heading >= 292.5 && heading < 337.5)
            str = "North-West"
        return str
    }
    /**
     * Draws a compass on the micro:bit screen
     * (has 12 animation stages)
     */
    //% block
    export function drawCompass(): void {
        if (input.compassHeading() >= 352.5 || input.compassHeading() < 7.5) {
            basic.clearScreen()
            led.plot(2, 0)
            led.plot(2, 1)
            led.plot(2, 2)
        } else if (input.compassHeading() >= 7.5 && input.compassHeading() < 22.5) {
            basic.clearScreen()
            led.plot(1, 0)
            led.plot(2, 1)
            led.plot(2, 2)
        } else if (input.compassHeading() >= 22.5 && input.compassHeading() < 37.5) {
            basic.clearScreen()
            led.plot(1, 0)
            led.plot(1, 1)
            led.plot(2, 2)
        } else if (input.compassHeading() >= 37.5 && input.compassHeading() < 52.5) {
            basic.clearScreen()
            led.plot(0, 0)
            led.plot(1, 1)
            led.plot(2, 2)
        } else if (input.compassHeading() >= 52.5 && input.compassHeading() < 67.5) {
            basic.clearScreen()
            led.plot(0, 1)
            led.plot(1, 1)
            led.plot(2, 2)
        } else if (input.compassHeading() >= 67.5 && input.compassHeading() < 82.5) {
            basic.clearScreen()
            led.plot(0, 1)
            led.plot(1, 2)
            led.plot(2, 2)
        } else if (input.compassHeading() >= 82.5 && input.compassHeading() < 97.5) {
            basic.clearScreen()
            led.plot(0, 2)
            led.plot(1, 2)
            led.plot(2, 2)
        } else if (input.compassHeading() >= 97.5 && input.compassHeading() < 112.5) {
            basic.clearScreen()
            led.plot(0, 3)
            led.plot(1, 2)
            led.plot(2, 2)
        } else if (input.compassHeading() >= 112.5 && input.compassHeading() < 127.5) {
            basic.clearScreen()
            led.plot(0, 3)
            led.plot(1, 3)
            led.plot(2, 2)
        } else if (input.compassHeading() >= 127.5 && input.compassHeading() < 142.5) {
            basic.clearScreen()
            led.plot(0, 4)
            led.plot(1, 3)
            led.plot(2, 2)
        } else if (input.compassHeading() >= 142.5 && input.compassHeading() < 157.5) {
            basic.clearScreen()
            led.plot(1, 4)
            led.plot(1, 3)
            led.plot(2, 2)
        } else if (input.compassHeading() >= 157.5 && input.compassHeading() < 172.5) {
            basic.clearScreen()
            led.plot(1, 4)
            led.plot(2, 3)
            led.plot(2, 2)
        } else if (input.compassHeading() >= 172.5 && input.compassHeading() < 187.5) {
            basic.clearScreen()
            led.plot(2, 4)
            led.plot(2, 3)
            led.plot(2, 2)
        } else if (input.compassHeading() >= 187.5 && input.compassHeading() < 202.5) {
            basic.clearScreen()
            led.plot(3, 4)
            led.plot(2, 3)
            led.plot(2, 2)
        } else if (input.compassHeading() >= 202.5 && input.compassHeading() < 217.5) {
            basic.clearScreen()
            led.plot(3, 4)
            led.plot(3, 3)
            led.plot(2, 2)
        } else if (input.compassHeading() >= 217.5 && input.compassHeading() < 232.5) {
            basic.clearScreen()
            led.plot(4, 4)
            led.plot(3, 3)
            led.plot(2, 2)
        } else if (input.compassHeading() >= 232.5 && input.compassHeading() < 247.5) {
            basic.clearScreen()
            led.plot(4, 3)
            led.plot(3, 3)
            led.plot(2, 2)
        } else if (input.compassHeading() >= 247.5 && input.compassHeading() < 262.5) {
            basic.clearScreen()
            led.plot(4, 3)
            led.plot(3, 2)
            led.plot(2, 2)
        } else if (input.compassHeading() >= 262.5 && input.compassHeading() < 277.5) {
            basic.clearScreen()
            led.plot(4, 2)
            led.plot(3, 2)
            led.plot(2, 2)
        } else if (input.compassHeading() >= 277.5 && input.compassHeading() < 292.5) {
            basic.clearScreen()
            led.plot(4, 1)
            led.plot(3, 2)
            led.plot(2, 2)
        } else if (input.compassHeading() >= 292.5 && input.compassHeading() < 307.5) {
            basic.clearScreen()
            led.plot(4, 1)
            led.plot(3, 1)
            led.plot(2, 2)
        } else if (input.compassHeading() >= 307.5 && input.compassHeading() < 322.5) {
            basic.clearScreen()
            led.plot(4, 0)
            led.plot(3, 1)
            led.plot(2, 2)
        } else if (input.compassHeading() >= 322.5 && input.compassHeading() < 337.5) {
            basic.clearScreen()
            led.plot(3, 0)
            led.plot(3, 1)
            led.plot(2, 2)
        } else if (input.compassHeading() >= 337.5 && input.compassHeading() < 352.5) {
            basic.clearScreen()
            led.plot(3, 0)
            led.plot(2, 1)
            led.plot(2, 2)
        }
    }
}
namespace Math {
    /**
     * Returns the minimum value of a number array
     */
    //% block
    export function arrayMin(l: number[]): number {
        let m = l[0]
        for (let i = 1; i < l.length; i++) {
            if (l[i] < m) {
                m = l[i]
            }
        }
        return m
    }
    /**
     * Returns the maximum value of a number array
     */
    //% block
    export function arrayMax(l: number[]): number {
        let m = l[0]
        for (let i = 1; i < l.length; i++) {
            if (l[i] > m) {
                m = l[i]
            }
        }
        return m
    }
    /**
     * Returns the average value of a number array
     */
    //% block
    export function arrayAvg(l: number[]): number {
        let s = 0
        for (let i = 0; i < l.length; i++) {
            s += l[i]
        }
        return s / l.length
    }
}
