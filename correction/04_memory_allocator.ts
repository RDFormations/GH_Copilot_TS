const POOL_SIZE = 4096;

interface Block {
  offset: number;
  size: number;
  free: boolean;
}

let memoryPool: Buffer;
const blocks: Block[] = [];

export function poolInit(): void {
  memoryPool = Buffer.alloc(POOL_SIZE);
  blocks.length = 0;
  blocks.push({ offset: 0, size: POOL_SIZE, free: true });
}

function blockFromPtr(ptr: Buffer): Block | undefined {
  const offset = ptr.byteOffset - memoryPool.byteOffset;
  return blocks.find((b) => b.offset === offset);
}

export function findFreeBlock(size: number): Buffer | null {
  for (const block of blocks) {
    if (block.free && block.size >= size) {
      block.free = false;
      if (block.size > size + 16) {
        const remainder: Block = {
          offset: block.offset + size,
          size: block.size - size,
          free: true,
        };
        block.size = size;
        blocks.push(remainder);
      }
      return memoryPool.subarray(block.offset, block.offset + size);
    }
  }
  return null;
}

export function poolFree(ptr: Buffer): void {
  const block = blockFromPtr(ptr);
  if (block) block.free = true;
}

export function poolStatus(): void {
  console.log("=== Pool Status ===");
  blocks.forEach((block, i) => {
    console.log(`  Block ${i}: size=${block.size}, ${block.free ? "FREE" : "USED"}`);
  });
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
