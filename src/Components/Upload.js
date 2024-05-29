import React, { useEffect, useRef, useState } from "react";
import "../styles/Upload.css";
import AWS from "aws-sdk";
import { Button } from "@mui/material";

const Upload = () => {
  const fileInputRef = useRef();
  const [files, setFiles] = useState([]);
  const [hrefs, setHrefs] = useState([]);
  const [uploadError, setUploadError] = useState(null);

  const region = "us-east-1";

  const accessKeyId = process.env.REACT_APP_accessKeyId;
  const secretAccessKey = process.env.REACT_APP_secretAccessKey;
  const bucketName = "sepproject7";

  useEffect(() => {
    // console.log(process.env.REACT_APP_accessKeyId );
    AWS.config.update({
      region: region,
      credentials: new AWS.Credentials({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      }),
    });
  }, []);

  const uploadFile = () => {
    const fileList = fileInputRef.current.files;
    if (fileList.length === 0) {
      setUploadError("Please select a file to upload.");
      return;
    }

    const promises = Array.from(fileList).map((file) => {
      const params = {
        Bucket: bucketName,
        Key: file.name,
        Body: file,
      };

      return new Promise((resolve, reject) => {
        const s3 = new AWS.S3();
        s3.upload(params, (err, data) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(data);
          }
        });
      });
    });

    Promise.all(promises)
      .then(() => {
        setUploadError(null);
        refreshList(bucketName);
        fileInputRef.current.value = ""; // Clear file input after upload
      })
      .catch((error) => {
        setUploadError(error);
      });
  };

  const refreshList = (bucketName) => {
    const s3 = new AWS.S3();
    s3.listObjectsV2({ Bucket: bucketName }, (err, data) => {
      if (err) {
        console.log("Error fetching data from the bucket.");
      } else {
        setFiles(data.Contents);
      }
    });
  };

  const deleteFile = (filename) => {
    const s3 = new AWS.S3();
    const params = {
      Bucket: bucketName,
      Key: filename,
    };
    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.log("Error deleting file.");
      } else {
        console.log("File deleted successfully!");
        refreshList(bucketName);
      }
    });
  };

  useEffect(() => {
    refreshList(bucketName);
  }, [bucketName]);

  useEffect(() => {
    const fetchHrefs = async () => {
      const promises = files.map(async (file) => {
        const s3 = new AWS.S3();
        const params = {
          Bucket: bucketName,
          Key: file.Key,
          ResponseContentDisposition: "attachment",
        };
        const href = await s3.getSignedUrlPromise("getObject", params);
        return href;
      });
      const resolvedHrefs = await Promise.all(promises);
      setHrefs(resolvedHrefs);
    };
    fetchHrefs();
  }, [files, bucketName]);

  return (
    <div className="text-white">
      <div>
        <h1 className="text-center text-6xl text-white font-bold mainheading">
          Upload Your Files
        </h1>
        <div className="h-[400px] w-3/5 border-2 border-white mx-auto mt-8 pt-10">
          <div className="w-full h-full flex flex-col">
            <h1 className="text-5xl text-center font-bold text-white pb-10">
              Choose file from device
            </h1>
            <input
              type="file"
              className="files text-white"
              ref={fileInputRef}
              multiple
            />
            <Button
              variant="contained"
              className="upload-btn"
              onClick={uploadFile}
            >
              Upload
            </Button>
          </div>
        </div>
      </div>
      <h1 className="text-center text-white mt-8">
        {uploadError
          ? uploadError
          : files.length === 0
          ? "No files uploaded."
          : "Uploaded Files"}
      </h1>
      {files.length > 0 && (
        <table className="mt-4 mx-auto">
          <thead>
            <tr>
              <th className="name">Name</th>
              <th>Size</th>
              <th>Download</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td>{file.Key}</td>
                <td>{file.Size}</td>
                <td className="underline">
                  <a href={hrefs[index]}>Download</a>
                </td>
                <td>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => deleteFile(file.Key)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Upload;
