export class EventRouter {
	private events: EventRoute[] = [];

	emit(eventName: (typeof this.events)[number]["name"]) {
		const event = this.getEvent(eventName);
		if (!event) {
			return () => {
				return {
					status: false,
					statusText: "Event not found",
				} as const;
			};
		}

		return event.handler;
	}

	createEvent(name: EventRoute["name"], handler: EventRoute["handler"]) {
		this.events.push({
			name,
			handler,
		});
	}

	removeEvent(name: EventRoute["name"]) {
		this.events = this.events.filter((event) => event.name !== name);
	}

	existsEvent(name: EventRoute["name"]) {
		return this.events.some((event) => event.name === name);
	}

	getEvent(name: EventRoute["name"]) {
		return this.events.find((event) => event.name === name);
	}
}
