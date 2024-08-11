function* createIdGenerator(): Generator<number, never, unknown> {
    let id = 1;
    while (true) {
        yield id++;
    }
}

export const idGenerator = createIdGenerator();