import React, {useEffect, useState, useRef, useCallback} from 'react';
import {Modal, Uploader} from "rsuite";
import {logger, toast} from "../utils/functions";

const UploadImage = (props) =>{
    const [show, setShow] = useState(false);
    const [image, setImage] = useState(props.images || '');

    React.useMemo(() => {
        props.onChange(image);
    }, [image]);


    return (
        <div className={'mb-2'}>
            <Uploader
                name={'image'}
                accept={'image/*'}
                fileListVisible={false}
                listType="picture"
                defaultFileList={[{id: 1, url: image, fileKey: 1}]}
                onPreview={(file, e) => {
                    if (file.url) {
                        setShow(true);
                    }
                }}
                onSuccess={(res, file) => {
                    file.url = res.image;
                    setImage(res.image);
                }}
                onRemove={(file) => {
                    setImage('');
                }}
                onError={() => {
                    toast('上传失败，网络错误', 'error');
                }}
                action={'/upload'}
            >
                <button type={'button'} style={{minHeight:  100, width: props.width || 100, height: props.height || 'auto'}}>
                    {props.value ? <img src={props.value} width="100%" height="100%" alt={""}/> : '上传'}
                </button>
            </Uploader>
            <Modal
                backdrop={true}
                overflow={false}
                show={show}
                onHide={() => setShow(false)}
            >
                <Modal.Header><Modal.Title>预览</Modal.Title></Modal.Header>
                <Modal.Body>
                    <img src={image} width={'100%'} alt={""}/>
                </Modal.Body>
            </Modal>
        </div>

    );
}

export default UploadImage;
