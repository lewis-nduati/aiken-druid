export type DruidVal = DruidDataVal | DruidPrimVal | DruidAlgVal;

export type DruidDataVal = {
  data: string
  label: string,
  uuid: string,
}

export type DruidAlgVal = {
  constructors: DruidConstructor[];
  label: string;
  uuid: string;
};

export type DruidConstructor = {
  label: string;
  constructor: number;
  fields: DruidVal[];
  uuid: string
};

export type DruidPrimVal = DruidIntVal | DruidBytesVal;

export type DruidIntVal = {
  int: number;
  label: string;
  uuid: string;
};

export type DruidBytesVal = {
  bytes: string;
  label: string;
  uuid: string
};


