const AWS=require('aws-sdk');

 
AWS.config.update({
   
    accesskeyid: process.env.AKIASICFRBJ3Q23ZTR52,
    region:"ap-south-1"});

const s3 = new AWS.S3();

const S3_BUCKET = "sampleperplexbucket";

module.exports = { s3, S3_BUCKET };