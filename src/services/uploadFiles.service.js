const config = require('../config/config')
const aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const blueBirdPromise = require('bluebird');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError')

let s3 = new aws.S3({
  accessKeyId: config.awsAccessKeyId,
  secretAccessKey: config.awsSecretAccessKeyId,
  Bucket: config.awsStorageBucketName,
  region: config.awsDefaultRegion
});

const uploadFiles = (files) => {
    if (files && files.length > 0) {
      try {
        return blueBirdPromise.mapSeries(files, async (file) => {
            const originalFileParams = {
              Bucket: `${config.awsStorageBucketName}/${config.awsSubPath}`,
              Key: uuidv4() + file.originalname,
              Body: file.buffer,
              ContentType: file.mimetype,
              signatureVersion: 'v4',
              ACL: 'public-read'
            };
            return s3.upload(originalFileParams).promise()
        }).then((uploadFiles) => {
          return uploadFiles.map((file) => file.Location)
        })
      } catch (error) {
        // throw new Error(`Error while uploading files.`)
    throw new ApiError(httpStatus.BAD_REQUEST, "Error while uploading files.")

      }
    }
    return new Promise((resolve, reject) => reject({status: 'no files found.'}))
};

module.exports={uploadFiles}