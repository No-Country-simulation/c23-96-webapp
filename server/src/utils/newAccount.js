const {generateUniqueCVU} = require('./cvuGenerator');
const accountModel = require('../models/account'); 

module.exports.createNewAccount = async () => {
  try {
    // Generate a unique CVU
    const newCVU = await generateUniqueCVU(accountModel);

    //Create Acount
    const account = await accountModel.create({
      cvu: newCVU,
      balancePeso: 0,
      balanceDolar: 0,
    });

    console.log('Account created successfully:', account);
    return account;
  } catch (error) {
    console.error('Error creating account:', error.message);
    throw error;
  }
};
