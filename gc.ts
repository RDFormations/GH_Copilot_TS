type ObjectID = string;

class HeapObject {
	public marked = false;
	public readonly fields: Map<string, HeapObject | null>;

	constructor(
		public readonly id: ObjectID,
		fields: Record<string, HeapObject | null> = {},
	) {
		this.fields = new Map(Object.entries(fields));
	}

	setField(name: string, value: HeapObject | null): void {
		this.fields.set(name, value);
	}
}

class GarbageCollector {
	private readonly heap = new Map<ObjectID, HeapObject>();
	private readonly roots = new Map<string, HeapObject>();

	allocate(
		id: ObjectID,
		fields: Record<string, HeapObject | null> = {},
	): HeapObject {
		if (this.heap.has(id)) {
			throw new Error(`Object ${id} already exists in the heap.`);
		}

		const object = new HeapObject(id, fields);
		this.heap.set(id, object);
		return object;
	}

	addRoot(name: string, object: HeapObject): void {
		this.roots.set(name, object);
	}

	removeRoot(name: string): void {
		this.roots.delete(name);
	}

	collect(): void {
		this.clearMarks();
		for (const root of this.roots.values()) {
			this.mark(root);
		}
		this.sweep();
	}

	private clearMarks(): void {
		for (const object of this.heap.values()) {
			object.marked = false;
		}
	}

	private mark(object: HeapObject): void {
		if (object.marked) {
			return;
		}

		object.marked = true;
		for (const child of object.fields.values()) {
			if (child !== null) {
				this.mark(child);
			}
		}
	}

	private sweep(): void {
		for (const [id, object] of Array.from(this.heap.entries())) {
			if (!object.marked) {
				this.heap.delete(id);
			}
		}
	}

	status(): string {
		return (
			Array.from(this.heap.values())
				.map((object) => object.id)
				.join(", ") || "(empty)"
		);
	}
}

function demoGarbageCollector(): void {
	const gc = new GarbageCollector();

	const nodeA = gc.allocate("A");
	const nodeB = gc.allocate("B");
	const nodeC = gc.allocate("C");
	const nodeD = gc.allocate("D");

	nodeA.setField("next", nodeB);
	nodeB.setField("next", nodeC);
	nodeC.setField("child", nodeD);

	gc.addRoot("root", nodeA);

	console.log("Before GC:", gc.status());
	gc.collect();
	console.log("After GC with root A:", gc.status());

	gc.removeRoot("root");
	gc.addRoot("rootB", nodeB);
	gc.collect();
	console.log("After switching root to B:", gc.status());
}

function main(): void {
	demoGarbageCollector();
}

main();
