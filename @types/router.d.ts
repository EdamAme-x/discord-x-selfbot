interface EventRoute {
	readonly name: string;
	handler: (...args: any[]) => Promise<void>;
}
