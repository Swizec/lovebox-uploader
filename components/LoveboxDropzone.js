import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import GridLoader from "react-spinners/GridLoader";

// TODO: move to secrets
const URL =
    "https://oer9ce8zz8.execute-api.us-east-1.amazonaws.com/dev/presignedurl";

async function getPresignedUploadUrl(file) {
    const presignedUrl = await fetch(
        `${URL}?filetype=${file.type}`
    ).then((res) => res.json());

    return presignedUrl;
}

async function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onabort = () => reject();
        reader.onerror = () => reject();
        reader.onload = () => resolve(reader.result);

        reader.readAsArrayBuffer(file);
    });
}

async function uploadFile(file) {
    const [{ uploadUrl }, data] = await Promise.all([
        getPresignedUploadUrl(file),
        readFile(file),
    ]);

    const res = await fetch(uploadUrl, {
        method: "PUT",
        body: data,
        headers: {
            // file type has to match presigned url type
            "Content-Type": file.type,
        },
    });

    if (res.ok) {
        console.log(await res.text());
    } else {
        console.log("ERROR");
        console.log(res);
    }
}

export function LoveboxDropzone() {
    const [uploading, setUploading] = useState(false);

    const onDrop = useCallback(async (acceptedFiles) => {
        setUploading(true);
        await Promise.all(acceptedFiles.map(uploadFile));
        setUploading(false);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    if (uploading) {
        return <GridLoader />;
    }

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop your photos here ...</p>
            ) : (
                <p>Drag'n'drop photos here, or click to select files</p>
            )}
        </div>
    );
}
