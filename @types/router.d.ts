interface EventResult {
	status: boolean;
	statusText: string | null;
}

interface EventRoute {
	readonly name: string;
	handler: () => Promise<EventResult>;
}
