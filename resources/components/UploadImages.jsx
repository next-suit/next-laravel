import React, {useEffect, useState, useRef, useCallback} from 'react';
import {Modal, Uploader} from "rsuite";
import {toast} from "../utils/functions";
import Upload from "@rsuite/icons/legacy/Upload";

const UploadImages = ({value, onChange, ...props}) => {
    const [show, setShow] = useState(false);
    const [preview, setPreview] = useState({});
    const [images, setImages] = useState([]);

    React.useMemo(() => {
        if(value){
            setImages(value.map(image => {return {id: image, url: image, fileKey: image}}));
        }
    }, [value]);


    return (
        <div>
            <Uploader
                name={'image'}
                accept={'image/*'}
                multiple
                listType={'picture'}
                fileList={images}
                onPreview={(file, e) => {
                    if (file.url) {
                        setPreview(file);
                        setShow(true);
                    }
                }}
                onSuccess={(res, file) => {
                    const file2 = {id: res.image, url: res.image, fileKey: res.image};
                    let images2 = [...images];
                    images2.push(file2);
                    setImages(images2);
                    onChange(images2.map(image => image.url));
                }}
                onRemove={(file) => {
                    let images2 = [...images];
                    let index = images2.findIndex(item => item.url === file.url);
                    images2.splice(index, 1);
                    setImages(images2);
                    onChange(images2.map(image => image.url));
                }}
                onError={() => {
                    toast('上传失败，网络错误', 'error');
                }}
                action={'/upload'}
            >
                <button type={'button'}>
                    <Upload />
                </button>
            </Uploader>
            <Modal
                backdrop={true}
                overflow={false}
                open={show}
                onClose={() => setShow(false)}
            >
                <Modal.Header><Modal.Title>预览</Modal.Title></Modal.Header>
                <Modal.Body>
                    <img src={preview.url} width={'100%'}/>
                </Modal.Body>
            </Modal>
        </div>

    );
};

export default React.memo(UploadImages)
