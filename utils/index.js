/**
 * Execute database action wrapped in an error handler.
 * @param {function} successCallback - The database action or commands to be executed.
 * @param {function} failureCallback - The function that will be executed when an error occurs.
 */
exports.executeDbAction = (successCallback, failureCallback) => {
  try {
    successCallback();
  } catch (error) {
    failureCallback(error);
  }
};

/**
 * Check data to see whether it contains data or null.
 * @param {object} data - The data to checked.
 * @param {function} callback - The function to be executed when the check evaluates to true.
 */
exports.checkIfDataIsNull = (data, callback) => {
  if (!data) {
    callback();
  }
};

/**
 * Find an item from a given array data.
 * @param {array} arrayData - The array data.
 * @param {string} inputId - The ID of a single data.
 * @param {function} callback - The function that will be executed when no matching data is found.
 */
exports.findItem = (arrayData, inputId, callback) => {
  const capturedData = arrayData.find((item) => {
    return Number(item.id) === Number(inputId);
  });

  if (!capturedData) {
    callback();
  }

  return capturedData;
};
