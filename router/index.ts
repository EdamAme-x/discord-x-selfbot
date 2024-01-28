export class EventRouter {
	private events: EventRoute[] = [];

	public emit(eventName: (typeof this.events)[number]["name"]) {
		const event = this.getEvent(eventName);
		if (!event) {
			return () => void 0;
		}

		return event.handler;
	}

	public createEvent(name: EventRoute["name"], handler: EventRoute["handler"]) {
		this.events.push({
			name,
			handler,
		});
	}

	public removeEvent(name: EventRoute["name"]) {
		this.events = this.events.filter((event) => event.name !== name);
	}

	public existsEvent(name: EventRoute["name"]) {
		return this.events.some((event) => event.name === name);
	}

	public getEvent(name: EventRoute["name"]) {
		return this.events.find((event) => event.name === name);
	}
}
