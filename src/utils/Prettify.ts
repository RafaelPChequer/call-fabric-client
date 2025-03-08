export type Prettify<T> = NonNullable<unknown> & {
    [K in keyof T]: Prettify<T[K]>;
} & {};