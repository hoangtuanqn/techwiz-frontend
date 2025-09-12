import { useMemo } from "react";
import { Howl } from "howler";

export const useNotificationSound = (file = "notification.mp3", loop = false) => {
    const sound = useMemo(
        () =>
            new Howl({
                src: [`/musics/${file}`],
                volume: 1.0,
                loop,
            }),
        [file, loop],
    );

    const playSound = () => {
        sound.play();
    };
    const stopSound = () => {
        sound.stop();
    };

    return { playSound, stopSound };
};
