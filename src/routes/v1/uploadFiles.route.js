const express = require('express');
const multer = require('multer');
const router = express.Router();
const uploadFilesController = require('../../controllers/uploadFiles.controller');
const auth = require('../../middlewares/auth');

const memoryStorage = multer.memoryStorage({
  destination(req, file, callback) {
    callback(null, '');
  },
});

const upload = multer({ storage: memoryStorage });

router.route('/uploadFile')
  .post( upload.array('file'), uploadFilesController.uploadImage);

module.exports = router;
