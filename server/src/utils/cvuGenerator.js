const generatedCVUs = new Set(); 

exports.generateUniqueCVU = async (model) => {
  let cvu;
  let isUnique = false;

  while (!isUnique) {
    // Generate a random CVU
    const bankBranch = String(Math.floor(Math.random() * 100000000)).padStart(8, "0"); 
    const accountIdentifier = String(Math.floor(Math.random() * 10000000000000)).padStart(14, "0"); 
    cvu = `${bankBranch}${accountIdentifier}`;

    // Check if the CVU is unique
    if (!generatedCVUs.has(cvu)) {
      const existingRecord = await model.findOne({ cvu }); // Check database
      if (!existingRecord) {
        isUnique = true;
        generatedCVUs.add(cvu); // Add to runtime Set
      }
    }
  }

  return cvu;
};
