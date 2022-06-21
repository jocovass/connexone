export function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds %= 60;
    minutes %= 60;

    return `${`00${hours}`.slice(-2)}:${`00${minutes}`.slice(
        -2,
    )}:${`00${seconds}`.slice(-2)}`;
}
