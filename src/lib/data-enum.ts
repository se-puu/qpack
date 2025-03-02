export const enum RangedData {
    // 6-bit unsigned integer
    /** Start of 6-bit unsigned integer range */
    Uint6_Start = 0,
    /** End of 6-bit unsigned integer range */
    Uint6_End = 63,

    // 5-bit string length
    /** Start of 5-bit string length range */
    String5_Start = 64,
    /** End of 5-bit string length range */
    String5_End = 95,

    // 5-bit object length
    /** Start of 5-bit object length range */
    Object5_Start = 96,
    /** End of 5-bit object length range */
    Object5_End = 127,

    // 5-bit array length
    /** Start of 5-bit array length range */
    Array5_Start = 128,
    /** End of 5-bit array length range */
    Array5_End = 159,

    // 3-bit null value
    /** Start of 3-bit null value range */
    Null3_Start = 160,
    /** End of 3-bit null value range */
    Null3_End=167,

    // 5-bit negative integer excluding the negative sign
    /** Start of 5-bit negative integer range */
    Nint5_Start=224,
    /** End of 5-bit negative integer range */
    Nint5_End=255,
}

export const enum FixedData {
    /** sign of meta */
    meta = 177,

    // Null
    /** sign of 8-bit length nul */
    Null8=178,
    /** sign of 16-bit length null */
    Null16 = 179,

    // Bool
    /** sign of true */
    True = 180, 
    /** sign of false */
    False = 181,

    // Uint
    /** sign of 8-bit unsigned integer */
    Uint8 = 182,
    /** sign of 16-bit unsigned integer */
    Uint16 = 183,
    /** sign of 24-bit unsigned integer */
    Uint24 = 184,
    /** sign of 32-bit unsigned integer */
    Uint32 = 185,
    /** sign of 40-bit unsigned integer */
    Uint40 = 186,
    /** sign of 48-bit unsigned integer */
    Uint48 = 187,
    /** sign of 64-bit unsigned integer */
    Uint64 = 188,

    // Int
    /** sign of 8-bit signed integer */
    Int8 = 189,
    /** sign of 16-bit signed integer */
    Int16 = 190,
    /** sign of 24-bit signed integer */
    Int24 = 191,
    /** sign of 32-bit signed integer */
    Int32 = 192,
    /** sign of 40-bit signed integer */
    Int40 = 193,
    /** sign of 48-bit signed integer */
    Int48 = 194,
    /** sign of 64-bit signed integer */
    Int64 = 195,
    /** sign of safe integer */
    IntSafe=196,

    // Float
    /** sign of 32-bit floating point number */
    Float32 = 197,
    /** sign of 64-bit floating point number */
    Float64 = 198,

    // String
    /** sign of 8-bit length string */
    String8 = 199,
    /** sign of 16-bit length string */
    String16 = 200,
    /** sign of 24-bit length string */
    String24 = 201,
    /** sign of 32-bit length string */
    String32 = 202,

    // Timestamp
    /** sign of 48-bit timestamp */
    UnixTime48 = 203,
    /** sign of 64-bit timestamp */
    UnixTime64 = 204,

    
    // Binary
    /** sign of 8-bit length binary */
    Binary8 = 205,
    /** sign of 16-bit length binary */
    Binary16 = 206,
    /** sign of 24-bit length binary */
    Binary24 = 207,
    /** sign of 32-bit length binary */
    Binary32 = 208,

    // Array
    /** sign of 8-bit length array */
    Array8 = 209,
    /** sign of 16-bit length array */
    Array16 = 210,
    /** sign of 24-bit length array */
    Array24 = 211,
    /** sign of 32-bit length array */
    Array32 = 212,

    // Object
    /** sign of 8-bit length object */
    Object8 = 213,
    /** sign of 16-bit length object */
    Object16 = 214,
    /** sign of 32-bit length object */
    Object32 = 215,

    // Map
    /** sign of 8-bit length map */
    Map8 = 216,
    /** sign of 16-bit length map */
    Map16 = 217,
    /** sign of 24-bit length map */
    Map24 = 218,
    /** sign of 32-bit length map */
    Map32 = 219,

    // Extension
    /** sign of 8-bit length extension */
    Extension8 = 220,
    /** sign of 16-bit length extension */
    Extension16 = 221,
    /** sign of 24-bit length extension */
    Extension24 = 222,
    /** sign of 32-bit length extension */
    Extension32 = 223,
}