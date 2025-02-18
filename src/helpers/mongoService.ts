export const getData: any = async (
  modelName,
  creteria,
  projection,
  options
) => {
  options.lean = true;
  return modelName.find(creteria, projection, options);
};

export const getFirstMatch: any = async (
  modelName,
  creteria: any,
  projection: any,
  options: any
) => {
  // options.lean = true;
  return modelName.findOne(creteria, projection, options);
};
export const getFirstMatchId: any = async (modelName, creteria: any) => {
  return modelName.findById(creteria);
};

export const creteData: any = async (modelName, objectTOSave) => {
  return new modelName(objectTOSave).save();
};

export const aggregateData: any = async (modelName, creteria) => {
  return modelName.aggregate(creteria);
};

export const updateData: any = async (
  modelName,
  criteria,
  dataToSet,
  options
) => {
  return modelName.findByIdAndUpdate(criteria, dataToSet, options);
};
