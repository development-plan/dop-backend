type TArrayWithLength<TItem, TLength extends number> = [TItem, ...TItem[]] & { length: TLength };

export default TArrayWithLength;
