export class Logger {
    private types: types[] = [
        {
            label: "Error",
            color: "\x1b[31m",
        },
        {
            label: "Warn",
            color: "\x1b[33m",
        },
        {
            label: "Info",
            color: "\x1b[32m",
        },
        {
            label: "Debug",
            color: "\x1b[34m",
        }
    ]

    public log(type: types["label"], message: string) {
        const typeColor = this.types.find((t) => t.label === type);
        if (typeColor) {
            console.log(`${this.createTimestamp()} ${typeColor.color}[${type.toUpperCase()}]\x1b[0m: ${message}`);
        }
    }

    private createTimestamp() {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `\x1b[90m[${hours}:${minutes}]\x1b[0m`;
    }
}