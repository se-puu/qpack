export const enum DataByte {
    /*----Byte------------------------------*/
    Null = 0,
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
    Eight = 8,
    Size_t = Four,
    Header = One,
}

/*----Float------------------------------*/
export const enum Float32 {
    Min = -3.4028234663852886e+38,
    Max = 3.4028234663852886e+38,
    Size = DataByte.Four,
    TSize = DataByte.Header + Float32.Size,
}
export const enum Float64 {
    Min = -1.7976931348623157e+308,
    Max = 1.7976931348623157e+308,
    Size = DataByte.Eight,
    TSize = DataByte.Header + Float64.Size,
}

/*----Positive integer------------------------------*/
export const enum Uint6 {
    Max = 0x3F,
    Min = 0,
    Size = DataByte.One,
    TSize = Uint6.Size,
}
export const enum Uint8 {
    Max = 0xFF,
    Min = Uint6.Max + 1,
    Size = DataByte.One,
    TSize = DataByte.Header + Uint8.Size,
}
export const enum Uint16 {
    Max = 0xFFFF,
    Min = Uint8.Max + 1,
    Size = DataByte.Two,
    TSize = DataByte.Header + Uint16.Size,
}
export const enum Uint24 {
    Max = 0xFFFFFF,
    Min = Uint16.Max + 1,
    Size = DataByte.Three,
    TSize = DataByte.Header + Uint24.Size
}
export const enum Uint32 {
    Max = 0xFFFFFFFF,
    Min = Uint24.Max + 1,
    Size = DataByte.Four,
    TSize = DataByte.Header + Uint32.Size,
}

export const enum Uint40 {
    Max = 0xFFFFFFFFFF,
    Min = Uint32.Max + 1,
    Size = DataByte.Five,
    TSize = DataByte.Header + Uint40.Size
}

export const enum Uint48 {
    Max = 0xFFFFFFFFFFFF,
    Min = Uint40.Max + 1,
    Size = DataByte.Six,
    TSize = DataByte.Header + Uint48.Size
}

export const enum Uint64 {
    Min = Uint48.Max + 1,
    Size = DataByte.Eight,
    TSize = DataByte.Header + Uint64.Size
}
/*----------------------------------*/

/*----Negative integer------------------------------*/
export const enum Nint5 {
    Max = -1,
    Min = -0x1F,
    Or = 0x1F,
    Size = DataByte.One,
    TSize = DataByte.Header + Nint5.Size,
}
/*----------------------------------*/

/*----signed integer ------------------------------*/
export const enum Int6 {
    Max = 0x7F,
    Min = -0x80,
    Size = DataByte.One,
    TSize = DataByte.Header + Int6.Size,
}

export const enum Int8 {
    Max = 0x7F,
    Min = -0x80,
    Size = DataByte.One,
    TSize = DataByte.Header + Int8.Size,
}

export const enum Int16 {
    Max = 0x7FFF,
    Min = -0x8000,
    Size = DataByte.Two,
    TSize = DataByte.Header + Int16.Size,
}

export const enum Int24 {
    Min = -0x800000,
    Size = DataByte.Three,
    TSize = DataByte.Header + Int24.Size
}

export const enum Int32 {
    Min = -0x80000000,
    Size = DataByte.Four,
    TSize = DataByte.Header + Int32.Size,
}

export const enum Int40 {
    Min = -0x8000000000,
    Size = DataByte.Five,
    TSize = DataByte.Header + Int40.Size
}

export const enum Int48 {
    Min = -0x800000000000,
    Size = DataByte.Six,
    TSize = DataByte.Header + Int48.Size
}

export const enum IntSafe {
    Size = DataByte.Eight,
    TSize = DataByte.Header + IntSafe.Size
}

export const enum Int64 {
    Size = DataByte.Eight,
    TSize = DataByte.Header + Int64.Size
}

/*----String------------------------------*/
export const enum String5 {
    // string
    Max = 0x1F,
    Size = DataByte.One,
    TSize = String5.Size,
}
export const enum String8 {
    Max = 0xFF,
    Size = DataByte.One,
    TSize = DataByte.Header + String8.Size,
}
export const enum String16 {
    Max = 0xFFFF,
    Size = DataByte.Two,
    TSize = DataByte.Header + String16.Size,
}
export const enum String24 {
    Max = 0xFFFFFF,
    Size = DataByte.Three,
    TSize = DataByte.Header + String24.Size,
}
export const enum String32 {
    Max = 0xFFFFFFFF,
    Size = DataByte.Four,
    TSize = DataByte.Header + String32.Size,
}

/*----Object------------------------------*/
export const enum Object5 {
    // object
    Max = 0x1F,
    Size = DataByte.One,
    TSize = Object5.Size,
}

export const enum Object8 {
    Max = 0xFF,
    Size = DataByte.One,
    TSize = DataByte.Header + Object8.Size,
}

export const enum Object16 {
    Max = 0xFFFF,
    Size = DataByte.Two,
    TSize = DataByte.Header + Object16.Size,
}

export const enum Object32 {
    Max = 0xFFFFFFFF,
    Size = DataByte.Four,
    TSize = DataByte.Header + Object32.Size,
}

/*----Null and undefined and Nil----------*/
export const enum Null3 {
    Max = 0x7,
    Size = DataByte.One,
    TSize = Null3.Size,
}

/*----Binary------------------------------*/
export const enum Binary8 {
    Max = 0xFF,
    Size = DataByte.One,
    TSize = DataByte.Header + Binary8.Size,
}

export const enum Binary16 {
    Max = 0xFFFF,
    Size = DataByte.Two,
    TSize = DataByte.Header + Binary16.Size,
}

export const enum Binary24 {
    Max = 0xFFFFFF,
    Size = DataByte.Three,
    TSize = DataByte.Header + Binary24.Size,
}

export const enum Binary32 {
    Max = 0xFFFFFFFF,
    Size = DataByte.Four,
    TSize = DataByte.Header + Binary32.Size,
}

/*----Timestamp------------------------------*/
export const enum Timestamp48 {
    Max = 0xFFFFFFFFFFFF,
    Size = DataByte.Six,
    TSize = DataByte.Header + Timestamp48.Size,
}
export const enum Timestamp64 {
    Size = DataByte.Eight,
    TSize = DataByte.Header + Timestamp64.Size,
}

/*----Array------------------------------*/
export const enum Array5 {
    Max = 0x1F,
    Size = DataByte.One,
    TSize = Array5.Size,
}

export const enum Array8 {
    Max = 0xFF,
    Size = DataByte.One,
    TSize = DataByte.Header + Array8.Size,
}

export const enum Array16 {
    Max = 0xFFFF,
    Size = DataByte.Two,
    TSize = DataByte.Header + Array16.Size,
}

export const enum Array24 {
    Max = 0xFFFFFF,
    Size = DataByte.Three,
    TSize = DataByte.Header + Array24.Size,
}

export const enum Array32 {
    Max = 0xFFFFFFFF,
    Size = DataByte.Four,
    TSize = DataByte.Header + Array32.Size,
}

/*----Map------------------------------*/
export const enum Map8 {
    Max = 0xFF,
    Size = DataByte.One,
    TSize = DataByte.Header + Map8.Size,
}

export const enum Map16 {
    Max = 0xFFFF,
    Size = DataByte.Two,
    TSize = DataByte.Header + Map16.Size,
}

export const enum Map24 {
    Max = 0xFFFFFF,
    Size = DataByte.Three,
    TSize = DataByte.Header + Map24.Size,
}

export const enum Map32 {
    Max = 0xFFFFFFFF,
    Size = DataByte.Four,
    TSize = DataByte.Header + Map32.Size,
}

/*----Extension------------------------------*/
export const enum Extension8 {
    Max = 0xFF,
    Size = DataByte.One,
    TypeSize = DataByte.Two,
    Minus=DataByte.Four-Extension8.Size,
    TSize = DataByte.Header + Extension8.Size + Extension8.TypeSize,
}

export const enum Extension16 {
    Max = 0xFFFF,
    Size = DataByte.Two,
    TypeSize = DataByte.Two,
    Minus=DataByte.Four-Extension16.Size,
    TSize = DataByte.Header + Extension16.Size + Extension16.TypeSize,
}

export const enum Extension24 {
    Max = 0xFFFFFF,
    Size = DataByte.Three,
    TypeSize = DataByte.Two,
    Minus=DataByte.Four-Extension24.Size,
    TSize = DataByte.Header + Extension24.Size + Extension24.TypeSize,
}

export const enum Extension32 {
    Max = 0xFFFFFFFF,
    Size = DataByte.Four,
    TypeSize = DataByte.Two,
    Minus=DataByte.Four-Extension32.Size,
    TSize = DataByte.Header + Extension32.Size + Extension32.TypeSize,
}