// --- Base Union Type for All Druid Value Types ---
export type DruidVal = DruidDataVal | DruidPrimVal | DruidAlgVal;

// --- Represents a Simple Data String Value ---
export type DruidDataVal = {
  data: string;     // Raw string data (could be any type of data)
  label: string;    // Descriptive label for the data
  uuid: string;     // Unique identifier for the data
};

// --- Represents a Primitive Value (Integer or Bytes) ---
export type DruidPrimVal = DruidIntVal | DruidBytesVal;

// --- Integer Value Type ---
export type DruidIntVal = {
  int: number;      // Integer value (could be any number)
  label: string;    // Descriptive label for the integer
  uuid: string;     // Unique identifier for the integer value
};

// --- Bytes Value Type ---
export type DruidBytesVal = {
  bytes: string;    // Hex or base64 encoded byte string
  label: string;    // Descriptive label for the byte value
  uuid: string;     // Unique identifier for the byte value
};

// --- Represents an Algebraic Data Type (ADT) with Constructors ---
export type DruidAlgVal = {
  constructors: DruidConstructor[]; // List of possible constructors for the ADT
  label: string;                    // Descriptive label for the ADT
  uuid: string;                     // Unique identifier for the ADT
};

// --- Represents a Specific Constructor in an ADT ---
export type DruidConstructor = {
  label: string;        // Constructor label (e.g., "Just", "Nothing")
  constructor: number;  // Constructor index (used for identification)
  fields: DruidVal[];   // List of fields passed to the constructor (recursive)
  uuid: string;         // Unique identifier for the constructor
};
