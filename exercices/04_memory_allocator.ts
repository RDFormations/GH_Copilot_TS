const POOL_SIZE = 4096;
const HEADER_SIZE = 16; // size (8) + free flag (1) + padding — simplified block header

interface Block {
	offset: number;
	size: number;
	free: boolean;
	next: Block | null;
}

let memoryPool: Buffer;
let freeList: Block | null = null;

export function poolInit(): void {
	memoryPool = Buffer.alloc(POOL_SIZE);
	freeList = {
		offset: 0,
		size: POOL_SIZE - HEADER_SIZE,
		free: true,
		next: null,
	};
}

/** Recherche un bloc libre de taille suffisante (stratégie first-fit). */
export function findFreeBlock(size: number): Buffer | null {
	// TODO: Implement avec Copilot
	// Commentaire-prompt : parcourir free list, marquer bloc USED, retourner slice du pool
	void size;
	return null;
}

export function poolFree(ptr: Buffer): void {
	if (!ptr) return;
	// TODO: retrouver le bloc parent et le marquer free
	void ptr;
}

export function poolStatus(): void {
	console.log("=== Pool Status ===");
	let current = freeList;
	let i = 0;
	while (current) {
		console.log(
			`  Block ${i}: size=${current.size}, ${current.free ? "FREE" : "USED"}`,
		);
		current = current.next;
		i++;
	}
	console.log("===================\n");
}

poolInit();
console.log(`Pool initialise (${POOL_SIZE} octets)\n`);
poolStatus();

console.log("Allocation de 100 octets...");
const a = findFreeBlock(100);
if (a) a.write("Hello from custom allocator!", 0, "utf-8");
poolStatus();

console.log("Allocation de 200 octets...");
const b = findFreeBlock(200);
if (b) b.fill("B".charCodeAt(0));
poolStatus();

console.log("Allocation de 50 octets...");
const c = findFreeBlock(50);
if (c) c.write("Small block", 0, "utf-8");
poolStatus();

console.log("Liberation du bloc de 100 octets...");
if (a) poolFree(a);
poolStatus();

if (c) {
	console.log(`Contenu du bloc c : "${c.toString("utf-8")}"`);
}

console.log("Liberation de tous les blocs...");
if (b) poolFree(b);
if (c) poolFree(c);
poolStatus();
