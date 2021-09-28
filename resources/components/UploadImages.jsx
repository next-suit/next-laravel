import React, {useEffect, useState, useRef, useCallback} from 'react';
import {Modal, Uploader} from "rsuite";
import {toast} from "../utils/functions";

export default React.memo(function UploadImages(props){
    const [show, setShow] = useState(false);
    const [preview, setPreview] = useState({});
    const [images, setImages] = useState(props.value || []);

    useEffect(() => {
        props.onChange(images);
    }, [images]);


    return (
        <div>
            <Uploader
                name={'image'}
                accept={'image/*'}
                multiple
                listType={'picture'}
                fileList={props.value && props.value.map(image => {return {id: image, url: image, fileKey: image}})}
                onPreview={(file, e) => {
                    if (file.url) {
                        setPreview(file);
                        setShow(true);
                    }
                }}
                onSuccess={(res, file) => {
                    file.id = 0;
                    file.url = res.image;
                    let images2 = [...images];
                    images2.push(file);
                    setImages(images2);
                }}
                onRemove={(file) => {
                    let images2 = [...images];
                    let index = images2.findIndex(item => item.url === file.url);
                    images2.splice(index, 1);
                    setImages(images2);
                }}
                onError={() => {
                    toast('上传失败，网络错误', 'error');
                }}
                action={'/upload'}
            />
            <Modal
                backdrop={true}
                overflow={false}
                show={show}
                onHide={() => setShow(false)}
            >
                <Modal.Header><Modal.Title>预览</Modal.Title></Modal.Header>
                <Modal.Body>
                    <img src={preview.url} width={'100%'}/>
                </Modal.Body>
            </Modal>
        </div>

    );
})
