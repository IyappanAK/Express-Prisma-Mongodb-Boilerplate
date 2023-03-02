const catchAsync = require('../utils/catchAsync');
const { uploadFilesService } = require('../services');

const uploadImage = catchAsync(async (req, res) => {
  const uploadedFiles = await uploadFilesService.uploadFiles(req.files);
  res.send({image:uploadedFiles});
});

module.exports = { uploadImage };
